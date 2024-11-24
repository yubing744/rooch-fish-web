import { Container, AnimatedSprite, useApp } from '@pixi/react';
import { useEffect, useState, useMemo } from 'react';
import * as PIXI from 'pixi.js';
import { config } from "../config/index";

type Direction = 'up' | 'down' | 'left' | 'right';
type AnimationState = 'idle' | 'move';

interface FishProps {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  velocity?: {
    x: number;
    y: number;
  };
}

const getAnimationState = (velocity: { x: number; y: number }): {
  state: AnimationState;
  direction: Direction;
} => {
  const isMoving = Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1;
  
  if (!isMoving) {
    return { state: 'idle', direction: 'right' };
  }

  const absX = Math.abs(velocity.x);
  const absY = Math.abs(velocity.y);

  if (absX > absY) {
    return {
      state: 'move',
      direction: velocity.x > 0 ? 'right' : 'left'
    };
  } else {
    return {
      state: 'move',
      direction: velocity.y > 0 ? 'down' : 'up'
    };
  }
};

export const Fish = ({ 
  x, 
  y, 
  scale = 1, 
  rotation = 0,
  velocity = { x: 0, y: 0 }
}: FishProps) => {
  const app = useApp();
  const [texturesMap, setTexturesMap] = useState<Record<string, PIXI.Texture[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const { state, direction } = useMemo(
    () => getAnimationState(velocity),
    [velocity]
  );

  useEffect(() => {
    const loadTextures = async () => {
      try {
        const resourceMap: Record<string, PIXI.Texture[]> = {};
        
        const loadDirectionalTextures = async (state: AnimationState, dir: Direction) => {
          const resourceName = state === 'idle' ? 'fish_idle' : `fish_move_${dir}`;
          const sheet = await PIXI.Assets.load(
            `${config.publicURL}/assets/characters/fish/${resourceName}.json`
          );
          resourceMap[resourceName] = Object.keys(sheet.data.frames).map(frame => 
            PIXI.Texture.from(frame)
          );
        };

        await loadDirectionalTextures('idle', 'right');
        await Promise.all([
          loadDirectionalTextures('move', 'up'),
          loadDirectionalTextures('move', 'down'),
          loadDirectionalTextures('move', 'left'),
          loadDirectionalTextures('move', 'right'),
        ]);

        setTexturesMap(resourceMap);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load fish textures:', error);
      }
    };

    loadTextures();
  }, []);

  if (!isLoaded) {
    return null;
  }

  const resourceName = state === 'idle' ? 'fish_idle' : `fish_move_${direction}`;
  const currentTextures = texturesMap[resourceName] || texturesMap.fish_idle;

  return (
    <Container x={x} y={y} scale={scale * 0.05}>
      <AnimatedSprite 
        textures={currentTextures}
        isPlaying={true}
        animationSpeed={0.1}
        anchor={0.5}
      />
    </Container>
  );
};
