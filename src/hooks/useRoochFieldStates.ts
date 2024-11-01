import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { getTransactionsByOrder } from "../utils/rooch_client"
import { listFieldStates, syncStates } from "../utils/index"

export function useRoochFieldStates(objectID: string, opts: any) {
  const client = useRoochClient();
  const [data, setData] = useState<Array<any>>(); // Fix useState syntax

  const { data: latestTxData } = useQuery({
    queryKey: ["rooch_latest_tx"],
    queryFn: async () => getTransactionsByOrder(client, null, 1, true),
  });

  const stateRoot = latestTxData?.result?.[0]?.execution_info?.state_root;
  const txOrder = latestTxData?.result?.[0]?.transaction?.sequence_info.tx_order;

  useEffect(() => {
    let mounted = true;

    const fetchFullData = async () => {
      try {
        const fieldStats = await listFieldStates(client, objectID, stateRoot);
        if (mounted) {
          setData(fieldStats?.result);
        }
      } catch (error) {
        console.error("Error fetching field states:", error);
      }
    };

    const fetchDiffData = async () => {
      try {
        const fieldStats = await syncStates(client, objectID, txOrder);
        if (mounted) {
          setData(fieldStats?.result);
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
  }, [client, stateRoot, txOrder, objectID, opts]); // Added objectID to deps

  return {
    data: data,
  };
}
