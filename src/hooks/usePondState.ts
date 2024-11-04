import { config, PondID } from "../config/index";
import { useRoochClientQuery } from "@roochnetwork/rooch-sdk-kit";
import { transformObject } from "../utils/rooch_object";
import { useQuery } from "@tanstack/react-query";
import { useRoochClient } from "@roochnetwork/rooch-sdk-kit";
import { listFieldStates } from "../utils/index"
import { useRoochState } from "./useRoochStates"
import { useRoochFieldStates } from "./useRoochFieldStates"

export function usePondState(pondID: PondID) {
  const client = useRoochClient();

  const { data, txOrder, refetch: roochFishRefetch } = useRoochState(
    config.ponds[pondID],
    { 
      refetchInterval: 60000,
    }
  );

  const pondData = transformObject(data?data[0]:null)

  const fishTableHandleId = pondData?.fishes?.handle?.id;
  const { data: fishData } = useRoochFieldStates(fishTableHandleId, {
    refetchInterval: 5000
  })

  const finalPondState = pondData ? {
    ...pondData,
  } : null;

  console.log("fishData:", fishData)
  const finalFishData = transformFish(fishData);
  return { data: finalPondState, fishData: finalFishData, foodData: []};
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