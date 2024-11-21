import { useRef, useCallback } from 'react';

interface DelayRecord {
  txOrder: string;
  sendTime: number;
  confirmTime?: number;
  syncTime?: number;
  totalDelay?: number;
  syncDelay?: number;
  isComplete: boolean;
}

interface PendingTx {
  tempId: string;
  sendTime: number;
  txOrder?: string;
  confirmTime?: number;
  syncTime?: number;
}

export function useTransactionDelay() {
  const delayRecordsRef = useRef<DelayRecord[]>([]);
  const pendingTxsRef = useRef<Map<string, PendingTx>>(new Map());
  const txOrderMapRef = useRef<Map<string, string>>(new Map());

  const startTracking = useCallback(() => {
    const tempId = crypto.randomUUID();
    pendingTxsRef.current.set(tempId, {
      tempId,
      sendTime: Date.now(),
    });
    return tempId;
  }, []);

  const updateDelayRecord = useCallback((pending: PendingTx, txOrder: string) => {
    const record: DelayRecord = {
      txOrder,
      sendTime: pending.sendTime,
      confirmTime: pending.confirmTime,
      syncTime: pending.syncTime,
      isComplete: Boolean(pending.confirmTime && pending.syncTime)
    };

    if (record.isComplete && record.confirmTime && record.syncTime) {
      record.totalDelay = Math.max(record.confirmTime, record.syncTime) - record.sendTime;
      record.syncDelay = Math.abs(record.syncTime - record.confirmTime);
    }

    const existingIndex = delayRecordsRef.current.findIndex(r => r.txOrder === txOrder);
    if (existingIndex >= 0) {
      delayRecordsRef.current[existingIndex] = record;
    } else {
      delayRecordsRef.current = [record, ...delayRecordsRef.current.slice(0, 4)];
    }

    if (record.isComplete) {
      pendingTxsRef.current.delete(pending.tempId);
      txOrderMapRef.current.delete(txOrder);
    }
  }, []);

  const recordTxConfirm = useCallback((tempId: string, txOrder: string) => {
    const pending = pendingTxsRef.current.get(tempId);
    if (!pending) return;

    pending.txOrder = txOrder;
    pending.confirmTime = Date.now();
    txOrderMapRef.current.set(txOrder, tempId);
    
    updateDelayRecord(pending, txOrder);
  }, [updateDelayRecord]);

  const recordStateSync = useCallback((txOrder: string) => {
    const tempId = txOrderMapRef.current.get(txOrder);
    if (!tempId) {
      const now = Date.now();
      const newTempId = crypto.randomUUID();
      const pending: PendingTx = {
        tempId: newTempId,
        sendTime: now,
        txOrder,
        syncTime: now
      };
      pendingTxsRef.current.set(newTempId, pending);
      txOrderMapRef.current.set(txOrder, newTempId);
      updateDelayRecord(pending, txOrder);
      return;
    }

    const pending = pendingTxsRef.current.get(tempId);
    if (!pending) return;

    pending.syncTime = Date.now();
    updateDelayRecord(pending, txOrder);
  }, [updateDelayRecord]);

  const getRecentDelays = useCallback(() => {
    return delayRecordsRef.current;
  }, []);

  return {
    startTracking,
    recordTxConfirm,
    recordStateSync,
    getRecentDelays,
  };
}