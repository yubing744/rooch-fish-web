import { Container, Graphics, Stage } from '@pixi/react';
import { useMemo, useEffect, useState } from 'react';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Args, Transaction } from "@roochnetwork/rooch-sdk";
import {
  UseSignAndExecuteTransaction,
} from "@roochnetwork/rooch-sdk-kit";
import { Fish } from '../components/fish';
import { Food } from '../components/food';
import { useFishController } from '../hooks/useFishController';
import { usePondState } from '../hooks/usePondState';
import { usePlayerState } from '../hooks/usePlayerState';
import { config } from "../config/index";

export const PondScene = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const { data: pondState, fishData } = usePondState(0);
  const { fish_ids } = usePlayerState(0)
  
  const width = 800;
  const height = 800;

  const scale = useMemo(() => {
    if (!pondState) return 1;
    
    const horizontalScale = (width - 80) / pondState.width;
    const verticalScale = (height - 80) / pondState.height;
    
    // Use the smaller scale to ensure pond fits within boundaries
    return Math.min(horizontalScale, verticalScale); 
  }, [pondState, width, height]);

  const boundaries = useMemo(() => ({
    minX: 40,
    maxX: width - 80,
    minY: 40,
    maxY: height - 80
  }), [width, height]);

  const waterFilters = useMemo(() => {
    const blur = new BlurFilter(2);
    const colorMatrix = new ColorMatrixFilter();
    
    colorMatrix.brightness(1.1, true);
    //colorMatrix.tint(0x4FA4FF, 0.2);
    
    return [blur, colorMatrix];
  }, []);

  const foodItems = useMemo(() => {
    const items = [];
    const foodColors = [0x00FF00, 0xFFFF00, 0xFFA500];
    const margin = 40;
    
    for (let i = 0; i < 10; i++) {
      items.push({
        x: margin + Math.random() * (width - margin * 2),
        y: margin + Math.random() * (height - margin * 2),
        size: 4 + Math.random() * 4,
        color: foodColors[Math.floor(Math.random() * foodColors.length)]
      });
    }
    return items;
  }, [width, height]);

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

  return (
    <Box>
      <Box position="relative">
        <Stage 
          width={width} 
          height={height} 
          options={{ 
            backgroundColor: 0xADD8E6,
            antialias: true 
          }}
        >
          <Container>
            <Graphics
              draw={g => {
                g.clear();
                g.beginFill(0x4FA4FF, 0.3);
                g.drawRoundedRect(20, 20, width - 40, height - 40, 15);
                g.endFill();
              }}
              filters={waterFilters}
            />
            
            <Graphics
              draw={g => {
                g.clear();
                g.lineStyle(4, 0x2980B9);
                g.drawRoundedRect(20, 20, width - 40, height - 40, 15);
              }}
            />

            <Container name="fishContainer" x={20} y={20} width={2000} height={2000}>
              <>
                  {fishData && fishData.map((fishState: any, index: number) => (
                      <Fish 
                        key={`fish-${index}`}
                        x={40 + fishState.x * scale} 
                        y={40 + fishState.y * scale} 
                        rotation={0}
                        scale={0.8} 
                      />
                  ))}

                  {foodItems.map((food, index) => (
                    <Food
                      key={`food-${index}`}
                      x={food.x}
                      y={food.y}
                      size={food.size}
                      color={food.color}
                    />
                  ))}
                </>
            </Container>
          </Container>
        </Stage>

        {(!fish_ids || fish_ids.length==0) && (
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: 3,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Welcome to the Pond!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              You don't have a fish yet. Purchase one to start playing!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchaseFish}
              disabled={purchaseLoading}
            >
              {purchaseLoading ? 'Purchasing...' : 'Purchase Fish'}
            </Button>
          </Paper>
        )}
      </Box>

      {playerFirstFish && (
        <Paper 
          sx={{ 
            mt: 2,
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                X: {Math.round(playerFirstFish.x)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Y: {Math.round(playerFirstFish.y)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};
