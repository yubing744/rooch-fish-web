import { config, PondID } from "../config/index";
import { useRoochClientQuery } from "@roochnetwork/rooch-sdk-kit";
import { transformObject } from "../utils/rooch_object";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { listFieldStates } from "../utils/index"
import { useRoochState } from "./useRoochStates"

export function usePondState(pondID: PondID) {
  const client = useRoochClient();

  const { data, txOrder, refetch: roochFishRefetch } = useRoochState(
    config.ponds[pondID],
    { 
      refetchInterval: 20000,
    }
  );

  const pondData = transformObject(data?data[0]:null)

  const finalPondState = pondData ? {
    ...pondData,
  } : null;

  return { data: finalPondState, fishData: [], foodData: []};
}
