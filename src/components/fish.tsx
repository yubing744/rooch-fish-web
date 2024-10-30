import { Container, Graphics } from '@pixi/react';
import { useMemo, useCallback } from 'react';
import * as PIXI from 'pixi.js';

interface FishProps {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  color?: number;
}

export const Fish = ({ x, y, scale = 1, rotation = 0, color = 0xFF6B6B}: FishProps) => {
  const drawFish = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(2, 0x000000, 1);
    g.beginFill(color);
    
    // Body
    g.moveTo(0, 0);
    g.bezierCurveTo(10, -15, 40, -15, 50, 0);
    g.bezierCurveTo(40, 15, 10, 15, 0, 0);
    
    // Tail
    g.moveTo(-5, 0);
    g.lineTo(-15, -10);
    g.lineTo(-15, 10);
    g.lineTo(-5, 0);
    
    g.endFill();
  }, [color]);

  return (
    <Container x={x} y={y} scale={scale} rotation={rotation}>
      <Graphics draw={drawFish} />
    </Container>
  );
};
