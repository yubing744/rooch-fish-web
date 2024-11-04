import { Container, Graphics, Stage } from '@pixi/react';
import { useMemo, useEffect, useState } from 'react';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';
import { Box, Button, Paper, Typography, Grid,  AppBar, Toolbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Args, Transaction } from "@roochnetwork/rooch-sdk";
import {
  UseSignAndExecuteTransaction,
} from "@roochnetwork/rooch-sdk-kit";
import { useFishController } from '../hooks/useFishController';
import { usePondState } from '../hooks/usePondState';
import { usePlayerState } from '../hooks/usePlayerState';
import { config } from "../config/index";
import { ExitZone } from '../types/index';

export const DebugScene = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);
  const { data: pondState, fishData, foodData } = usePondState(0);
  //const { fish_ids } = usePlayerState(0)
  const fish_ids = new Array<number>();

  const width = 800;
  const height = 800;

  console.log("pondState:", pondState)

  /*
  const boundaries = useMemo(() => ({
    minX: 40,
    maxX: width - 80,
    minY: 40,
    maxY: height - 80
  }), [width, height]);

  const playerFirstFish = useMemo(() => {
    if (!fish_ids || !fishData || fish_ids.length === 0) return null;
    return fishData.find((fish: any) => fish.id === fish_ids[0]);
  }, [fish_ids, fishData]);

  useFishController(0, playerFirstFish ? parseInt(playerFirstFish.id) : 0, 100, 100, boundaries);

  const { mutateAsync: signAndExecuteTransaction } =
      UseSignAndExecuteTransaction();

  const handlePurchaseFish = async () => {
    try {
      setPurchaseLoading(true);
      const txn = new Transaction();
      txn.callFunction({
        address: config.roochFishAddress,
        module: "rooch_fish", 
        function: "purchase_fish",
        args: [
          Args.objectId(config.gameStateObjectID),
          Args.u64(BigInt(0)), // pond_id 
        ],
      });
  
      await signAndExecuteTransaction({ transaction: txn });
      setPurchaseLoading(false);
    } catch (error) {
      console.error(String(error));

      if (String(error).includes("1004")) {
        enqueueSnackbar("Insufficient gas, please claim gas first", { 
          variant: "warning" 
        });
      } else {
        enqueueSnackbar(String(error), {
          variant: "warning"
        });
      }
    } finally {
      setPurchaseLoading(false);
    }
  };

  const handleFeedPond = async () => {
    try {
      setFeedLoading(true);
      const txn = new Transaction();
      txn.callFunction({
        address: config.roochFishAddress,
        module: "rooch_fish",
        function: "feed_food",
        args: [
          Args.objectId(config.gameStateObjectID),
          Args.u64(BigInt(0)), // pond_id
          Args.u64(BigInt(10)), // count
        ],
      });

      const tx = await signAndExecuteTransaction({ transaction: txn });
      if (tx?.output?.status?.type != 'executed') {
        const errorMsg = `Feed food failed: ${tx?.output?.status?.type}`;
        console.error("Feed food fail:", errorMsg);
        enqueueSnackbar(errorMsg, { 
          variant: "warning" 
        });
        return;
      }

      console.log("Feed food success!")
      enqueueSnackbar("Successfully fed the pond!", { variant: "success" });
    } catch (error) {
      console.error(String(error));
      enqueueSnackbar(String(error), { variant: "error" });
    } finally {
      setFeedLoading(false);
    }
  };

  const isInExitZone = (fishX: number, fishY: number): boolean => {
    if (!pondState?.exit_zones) return false;
    
    return pondState.exit_zones.some((zone: ExitZone) => {
      const distance = Math.sqrt(
        Math.pow(fishX - zone.x, 2) + 
        Math.pow(fishY - zone.y, 2)
      );
      return distance <= zone.radius;
    });
  };
  
  const handleExitPond = async () => {
    if (!playerFirstFish) return;
    
    if (!isInExitZone(playerFirstFish.x, playerFirstFish.y)) {
      enqueueSnackbar("Fish must be in an exit zone to leave the pond", { 
        variant: "warning" 
      });
      return;
    }
  
    try {
      setExitLoading(true);
      const txn = new Transaction();
      txn.callFunction({
        address: config.roochFishAddress,
        module: "rooch_fish",
        function: "destroy_fish",
        args: [
          Args.objectId(config.gameStateObjectID),
          Args.u64(BigInt(0)), // pond_id
          Args.u64(BigInt(playerFirstFish.id)),
        ],
      });
  
      const tx = await signAndExecuteTransaction({ transaction: txn });
      if (tx?.output?.status?.type != 'executed') {
        throw new Error(`Exit failed: ${tx?.output?.status?.type}`);
      }
  
      enqueueSnackbar("Successfully exited the pond!", { 
        variant: "success" 
      });
    } catch (error) {
      console.error(String(error));
      enqueueSnackbar(String(error), { 
        variant: "error" 
      });
    } finally {
      setExitLoading(false);
    }
  };
  */

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            disabled={feedLoading}
            sx={{ mr: 2 }}
          >
            Buy Fish
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={feedLoading}
            sx={{ mr: 2 }}
          >
            {feedLoading ? 'Feeding...' : 'Feed 10 food'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
