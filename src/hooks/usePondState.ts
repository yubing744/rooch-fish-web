import { config, PondID } from "../config/index";
import { useRoochClientQuery } from "@roochnetwork/rooch-sdk-kit";
import { transformObject } from "../utils/rooch_object";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { listFieldStates } from "../utils/index"

export function usePondState(pondID: PondID) {
  const client = useRoochClient();

  const { data, refetch: roochFishRefetch } = useRoochClientQuery(
    "getStates",
    {
      accessPath: `/object/${config.ponds[pondID]}`,
      stateOption: {
        decode: true,
      },
    },
    { refetchInterval: 20000 }
  );

  const pondData = transformObject(data?data[0]:null)

  const fishTableHandleId = pondData?.fishes?.contents?.handle?.id;
  const { data: fishData } = useQuery({
    queryKey: ["listFieldStates", fishTableHandleId],
    queryFn: async () => fishTableHandleId ? listFieldStates(client, fishTableHandleId) : null,
    enabled: !!fishTableHandleId,
    refetchInterval: 500,
  });

  // console.log("🚀 fish data:", fishData);

  
  const foodTableHandleId = pondData?.foods?.contents?.handle?.id;
  const { data: foodData } = useQuery({
    queryKey: ["listFieldStates", foodTableHandleId],
    queryFn: async () => foodTableHandleId ? listFieldStates(client, foodTableHandleId) : null,
    enabled: !!foodTableHandleId,
    refetchInterval: 5000,
  });

  console.log("🚀 food data:", foodData);

  const finalFishData = transformFish(fishData);
  const finalFoodData = transformFood(foodData);

  const finalPondState = pondData ? {
    ...pondData,
  } : null;

  /*
  finalFishData && finalFishData.map((fishState: any, index: number) => {
    console.log(`Fish ${index} position:`, fishState.x, fishState.y);
  })
  */

  return { data: finalPondState, fishData: finalFishData, foodData: finalFoodData};
}

function transformFish(data: any): any {
   const fishData = transformObject(data)
   return fishData ? Array.from(fishData.result).map((item: any)=>{
     return item.state
   }): []
}

function transformFood(data: any): any {
  const foodData = transformObject(data)

  //console.log("🚀 fish data:", foodData);

  return foodData ? Array.from(foodData?.result).map((item: any)=>{
    return item.state
  }) : []
}
