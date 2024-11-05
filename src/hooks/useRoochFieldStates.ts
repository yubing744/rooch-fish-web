import { Buffer } from 'buffer';
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLatestTransaction } from "../utils/rooch_client";
import { listFieldStates, syncStates } from "../utils/index";
import { useRoochWSClient } from "./useRoochWSClient";
import { BcsType } from "@roochnetwork/rooch-sdk";

export function useRoochFieldStates(
  objectID: string, 
  fieldBcsType: BcsType, 
  opts: { refetchInterval: number }
) {
  const client = useRoochWSClient();
  const [fields, setFields] = useState<Map<string, any>>(new Map<string, any>);

  const { data: latestTxData } = useQuery({
    queryKey: ["rooch_latest_tx_for_use_rooch_field_states"],
    queryFn: async () => getLatestTransaction(client),
    enabled: !!objectID,
    refetchInterval: 60000,
  });

  const stateRoot = latestTxData?.execution_info?.state_root;
  const txOrder = latestTxData?.transaction?.sequence_info.tx_order;
  const cursorRef = useRef(txOrder);

  const deserializeFieldState = (hexValue: string) => {
    try {
      const cleanHexValue = hexValue.startsWith('0x') ? hexValue.slice(2) : hexValue;
      const buffer = Buffer.from(cleanHexValue, "hex");
      return fieldBcsType.parse(buffer);
    } catch (error) {
      console.error('BCS deserialization error:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!objectID || !stateRoot || !txOrder) {
      return;
    }

    let mounted = true;
    cursorRef.current = txOrder;

    const fetchFullData = async () => {
      try {
        const fieldStats = await listFieldStates(client, objectID, stateRoot);
        
        if (mounted && fieldStats?.result) {
          const newFields = new Map<string, any>();
          
          for (const item of fieldStats.result) {
            if (item.state?.value) {
              const deserializedValue = deserializeFieldState(item.state.value);
              if (deserializedValue) {
                newFields.set(item.field_key, deserializedValue);
              }
            }
          }
          
          setFields(newFields);
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

            if (changeSet.state_change_set.changes.length === 0) continue;

            setFields(prevFields => {
              const newFields = new Map(prevFields);
              
              for (const change of changeSet.state_change_set.changes) {
                for (const field of change.fields) {
                  if (field.value?.modify) {
                    const deserializedValue = deserializeFieldState(field.value.modify);
                    if (deserializedValue) {
                      const fieldKey = field.metadata.id.slice(-64);
                      newFields.set(fieldKey, deserializedValue);
                    }
                  }
                }
              }
              
              return newFields;
            });
          }
        }
      } catch (error) {
        console.error("Error fetching field states:", error);
      }
    };

    fetchFullData();

    const intervalId = setInterval(fetchDiffData, opts.refetchInterval);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [stateRoot, txOrder, objectID, fieldBcsType]); // Added fieldBcsType to deps

  return {
    fields: fields || new Map(),
  };
}
