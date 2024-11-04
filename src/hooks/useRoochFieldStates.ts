import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { getTransactionsByOrder } from "../utils/rooch_client"
import { listFieldStates, syncStates } from "../utils/index"

export function useRoochFieldStates(objectID: string, opts: any) {
  const client = useRoochClient();
  const [data, setData] = useState<Array<any>>([]); // Fix useState syntax


  const { data: latestTxData } = useQuery({
    queryKey: ["rooch_latest_tx"],
    queryFn: async () => getTransactionsByOrder(client, null, 1, true),
    enabled: !!objectID,
    refetchInterval: 60000,
  });

  console.log("latestTxData:", latestTxData)


  const stateRoot = latestTxData?.result?.[0]?.execution_info?.state_root;
  const txOrder = latestTxData?.result?.[0]?.transaction?.sequence_info.tx_order;
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
        console.log("start fetchDiffData, txOrder:", cursorRef.current)

        const fieldStats = await syncStates(client, objectID, cursorRef.current);
        if (mounted && cursorRef.current) {
          console.log("diffData:", fieldStats)

          for (const changeSet of fieldStats.result) {
            if (BigInt(changeSet.tx_order) > BigInt(cursorRef.current)) {
              cursorRef.current = changeSet.tx_order;
            }
          }
          //setData(fieldStats?.result);
        }
      } catch (error) {
        console.error("Error fetching field states:", error);
      }
    };

    fetchFullData();

    const intervalId = setInterval(fetchDiffData, 5000); // Changed to 1s for better performance

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
