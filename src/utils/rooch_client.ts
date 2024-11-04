import { TransactionWithInfoView, RoochClient } from "@roochnetwork/rooch-sdk";
 
export const listFieldStates = async (client: RoochClient, object_id: string, stateRoot?: string | null) => {
  try {
    let result: any[] = [];
    let cursor = null;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const data = await (client as any).transport.request({
          method: 'rooch_listFieldStates',
          params: [
            object_id, 
            cursor, 
            "100", 
            {
              decode: true,
              stateRoot: stateRoot,
            },
          ],
        }) as any;

        //console.log("🚀 ~ file: listFieldStates ~ data:", data);
        
        if (!data) {
          throw new Error('No data returned from listFieldStates request');
        }

        cursor = data.next_cursor ?? null;
        result = result.concat(data.data || []);
        
        if (!data.has_next_page) {
          break;
        }
      } catch (error) {
        console.error('Error during listFieldStates pagination:', error);
        break; // Break the loop on error
      }
    }

    return { result };
  } catch (error) {
    console.error('Fatal error in listFieldStates:', error);
    throw error; // Re-throw to be handled by React Query's error handling
  }
};

export const syncStates = async (client: RoochClient, object_id: string, txOrder?: string | null) => {
  try {
    let result: any[] = [];
    let cursor = null;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const data = await (client as any).transport.request({
          method: 'rooch_synchStates',
          params: [
            object_id, 
            cursor, 
            "100", 
            {
              decode: true,
              stateRoot: txOrder,
            },
          ],
        }) as any;

        console.log("🚀 ~ file: listFieldStates ~ data:", data);
        
        if (!data) {
          throw new Error('No data returned from listFieldStates request');
        }

        cursor = data.next_cursor ?? null;
        result = result.concat(data.data || []);
        
        if (!data.has_next_page) {
          break;
        }
      } catch (error) {
        console.error('Error during listFieldStates pagination:', error);
        break; // Break the loop on error
      }
    }

    return { result };
  } catch (error) {
    console.error('Fatal error in listFieldStates:', error);
    throw error; // Re-throw to be handled by React Query's error handling
  }
}

export const getTransactionsByOrder = async (client: RoochClient, cursor: number | null, limit: number | null, descending_order: boolean) => {
  try {
    let result: TransactionWithInfoView[] = [];
    let cursor = null;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const data = await (client as any).transport.request({
          method: 'rooch_getTransactionsByOrder',
          params: [
            cursor, 
            limit, 
            descending_order,
          ],
        }) as any;

        console.log("🚀 ~ file: listFieldStates ~ data:", data);
        
        if (!data) {
          throw new Error('No data returned from listFieldStates request');
        }

        cursor = data.next_cursor ?? null;
        result = result.concat(data.data || []);
        
        if (!data.has_next_page) {
          break;
        }
      } catch (error) {
        console.error('Error during listFieldStates pagination:', error);
        break; // Break the loop on error
      }
    }

    return { result };
  } catch (error) {
    console.error('Fatal error in listFieldStates:', error);
    throw error; // Re-throw to be handled by React Query's error handling
  }
};
