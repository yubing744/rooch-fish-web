import { useRoochClientQuery } from "@roochnetwork/rooch-sdk-kit";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { getTransactionsByOrder } from "../utils/rooch_client"

export function useRoochState(objectID: string, opts: any) {
  const client = useRoochClient();

  const { data: latestTxData } = useQuery({
    queryKey: ["rooch_latest_tx"],
    queryFn: async () => getTransactionsByOrder(client, null, 1, true),
  });

  const stateRoot = latestTxData?.result?.[0]?.execution_info?.state_root;
  const txOrder = latestTxData?.result?.[0]?.transaction?.sequence_info.tx_order;

  const { data, refetch: refetch } = useRoochClientQuery(
    "getStates",
    {
      accessPath: `/object/${objectID}`,
      stateOption: {
        decode: true,
        stateRoot: stateRoot
      },
    },
    { 
      enabled: !!stateRoot,
      refetchInterval: opts.refetchInterval,
    }
  );

  return { 
    data: data,
    stateRoot: stateRoot,
    txOrder: txOrder, 
    refetch: refetch,
  };
}
