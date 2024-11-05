import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLatestTransaction } from "../utils/rooch_client"
import { listFieldStates, syncStates } from "../utils/index"
import { useRoochWSClient } from "./useRoochWSClient"

export function useRoochFieldStates(objectID: string, opts: any) {
  const client = useRoochWSClient();
  const [data, setData] = useState<Array<any>>([]); // Fix useState syntax

  const { data: latestTxData } = useQuery({
    queryKey: ["rooch_latest_tx_for_use_rooch_field_states"],
    queryFn: async () => getLatestTransaction(client),
    enabled: !!objectID,
    refetchInterval: 60000,
  });

  console.log("latestTxData:", latestTxData)

  const stateRoot = latestTxData?.execution_info?.state_root;
  const txOrder = latestTxData?.transaction?.sequence_info.tx_order;
  const cursorRef = useRef(txOrder);

  useEffect(() => {
    if (!objectID || !stateRoot || !txOrder) {
      return
    }

    let mounted = true;
    cursorRef.current = txOrder;

    const fetchFullData = async () => {
      try {
        console.log("start fetchFullData")

        const fieldStats = await listFieldStates(client, objectID, stateRoot);
        if (mounted) {
          console.log("fullData:", fieldStats)
          setData(fieldStats?.result);
        }
      } catch (error) {
        console.error("Error fetching field states:", error);
      }
    };

    const fetchDiffData = async () => {
      try {
        const fieldStats = await syncStates(client, objectID, cursorRef.current);
        if (mounted && cursorRef.current) {
          for (const changeSet of fieldStats.result) {
            if (BigInt(changeSet.tx_order) > BigInt(cursorRef.current)) {
              cursorRef.current = changeSet.tx_order;
            }

            if (changeSet.state_change_set.changes.length == 0) {
              continue
            }

            console.log("diffData:", changeSet.state_change_set)
          }
          //setData(fieldStats?.result);
        }
      } catch (error) {
        console.error("Error fetching field states:", error);
      }
    };

    fetchFullData();

    const intervalId = setInterval(fetchDiffData, opts.refetchInterval); // Changed to 1s for better performance

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [stateRoot, txOrder, objectID]); // Added objectID to deps

  return {
    data: {
      result: data ? data : [],
    }
  };
}
