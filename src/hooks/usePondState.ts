import { config } from "../config/index";
import { useRoochClientQuery } from "@roochnetwork/rooch-sdk-kit";
import { transformObject } from "../utils/rooch_object";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { listFieldStates } from "../utils/index"

export function usePondState(pondID: number) {
  const client = useRoochClient();

  const { data, refetch: roochFishRefetch } = useRoochClientQuery(
    "getStates",
    {
      accessPath: `/object/${config.ponds[pondID]}`,
      stateOption: {
        decode: true,
      },
    },
    { refetchInterval: 3000 }
  );

  const pondData = transformObject(data?data[0]:null)

  const fishTableHandleId = pondData?.fishes?.contents?.handle?.id;
  const { data: fishData } = useQuery({
    queryKey: ["listFieldStates", fishTableHandleId],
    queryFn: async () => fishTableHandleId ? listFieldStates(client, fishTableHandleId) : null,
    enabled: !!fishTableHandleId,
  });

  const foodTableHandleId = pondData?.foods?.contents?.handle?.id;
  const { data: foodData } = useQuery({
    queryKey: ["listFieldStates", foodTableHandleId],
    queryFn: async () => foodTableHandleId ? listFieldStates(client, foodTableHandleId) : null,
    enabled: !!foodTableHandleId,
  });

  const finalPondState = pondData ? {
    ...pondData,
    fishData: fishData,
    foodData: foodData
  } : null;

  return { data: finalPondState };
}
