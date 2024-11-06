import { Buffer } from 'buffer';
import { Container, Graphics, Stage } from '@pixi/react';
import { useMemo, useEffect, useState, useRef } from 'react';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';
import { Box, Button, Paper, Typography, Grid, AppBar, Toolbar } from '@mui/material';
import { bcs } from "@roochnetwork/rooch-sdk";
import { useSnackbar } from 'notistack';
import { usePondState } from '../hooks/usePondState';

export const DebugScene = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);
  const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const requestIdRef = useRef(0);
  const { data: pondState, fishData, foodData } = usePondState(0);

  console.log("pondState:", pondState);
  console.log("fishData:", fishData);
  console.log("foodData:", foodData);

  const testWebSocket = () => {
    try {
      setWsStatus('connecting');
      const ws = new WebSocket('wss://test-seed.rooch.network/'); // 替换成你的 WebSocket 地址
      wsRef.current = ws;

      ws.onopen = () => {
        setWsStatus('connected');
        enqueueSnackbar('WebSocket connected successfully!', { variant: 'success' });
        // 发送测试消息
        ws.send('Hello Server!');
      };

      ws.onmessage = (event) => {
        enqueueSnackbar(`Received message: ${event.data}`, { variant: 'info' });
      };

      ws.onerror = (error) => {
        setWsStatus('disconnected');
        enqueueSnackbar('WebSocket connection error!', { variant: 'error' });
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        setWsStatus('disconnected');
        wsRef.current = null;
        enqueueSnackbar('WebSocket connection closed', { variant: 'warning' });
      };

    } catch (error: any) {
      setWsStatus('disconnected');
      wsRef.current = null;
      enqueueSnackbar(`WebSocket error: ${error.message}`, { variant: 'error' });
    }
  };

  const closeWebSocket = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
      wsRef.current = null;
      setWsStatus('disconnected');
    }
  };

  /*
    {
        "jsonrpc": "2.0",
        "id": 10,
        "method": "rooch_syncStates",
        "params": [
            {
                "object_i_d": "0x331bc3f86328ed93a71dca803349df9a7b44ef4c697c9522a0f70ece05381bbc"
            },
            "89209125",
            "100",
            {
                "decode": true,
                "descending": false
            }
        ]
    }
  */
  const sendSyncStatesRequest = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      enqueueSnackbar('WebSocket not connected!', { variant: 'error' });
      return;
    }

    const request = {
      jsonrpc: "2.0",
      id: requestIdRef.current++,
      method: "rooch_syncStates",
      params: [
        "all",
        "89209125",
        "100",
        {
            "decode": true,
            "descending": false
        }
      ]
    };

    try {
      wsRef.current.send(JSON.stringify(request));
      enqueueSnackbar('Sync states request sent!', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(`Failed to send request: ${error.message}`, { variant: 'error' });
    }
  };

  // 组件卸载时关闭连接
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const testBcsDeserialization = () => {
    try {
      // 定义Fish结构
      const Fish = bcs.struct('Fish', {
        id: bcs.u64(),
        owner: bcs.Address, // Move address是32字节
        size: bcs.u64(),
        x: bcs.u64(),
        y: bcs.u64(),
      });

      // 定义DynamicField结构
      const DynamicField = bcs.struct('DynamicField', {
        name: bcs.u64(),
        value: Fish,
      });

      const hexString = "09000000000000000900000000000000583c31fe2f5a549538f7fc039bf1569af1e20a45f159b11472a18a641549effd0c0000000000000015000000000000000c00000000000000";
      const buffer = Buffer.from(hexString, "hex");
      const deserializedData = DynamicField.parse(buffer);
      console.log("deserializedData:", deserializedData)
    } catch (error: any) {
      console.error('BCS deserialization error:', error);
      enqueueSnackbar(`BCS deserialization failed: ${error.message}`, { 
        variant: 'error' 
      });
    }
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            disabled={wsStatus === 'connecting' || wsStatus === 'connected'}
            onClick={testWebSocket}
            sx={{ mr: 2 }}
          >
            {wsStatus === 'connecting' ? 'Connecting...' : 'Connect WebSocket'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={wsStatus !== 'connected'}
            onClick={closeWebSocket}
            sx={{ mr: 2 }}
          >
            Disconnect WebSocket
          </Button>
          <Button
            variant="contained"
            color="info"
            disabled={wsStatus !== 'connected'}
            onClick={sendSyncStatesRequest}
            sx={{ mr: 2 }}
          >
            Sync States
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={testBcsDeserialization}
            sx={{ mr: 2 }}
          >
            Test BCS Deserialization
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            Status: {wsStatus}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
