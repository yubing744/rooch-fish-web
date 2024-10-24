import { useState, useEffect } from 'react';

interface FishState {
  x: number;
  y: number;
  rotation: number;
  velocity: {
    x: number;
    y: number;
  };
}

interface BoundaryProps {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const useFishController = (initialX: number, initialY: number, boundaries: BoundaryProps) => {
  const [fishState, setFishState] = useState<FishState>({
    x: initialX,
    y: initialY,
    rotation: 0,
    velocity: { x: 0, y: 0 }
  });

  const speed = 5;

  useEffect(() => {
    const keys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key);
    };

    const updatePosition = () => {
      setFishState(prev => {
        let dx = 0;
        let dy = 0;

        if (keys.has('ArrowLeft') || keys.has('a')) dx -= speed;
        if (keys.has('ArrowRight') || keys.has('d')) dx += speed;
        if (keys.has('ArrowUp') || keys.has('w')) dy -= speed;
        if (keys.has('ArrowDown') || keys.has('s')) dy += speed;

        let newX = Math.max(boundaries.minX, Math.min(boundaries.maxX, prev.x + dx));
        let newY = Math.max(boundaries.minY, Math.min(boundaries.maxY, prev.y + dy));
        
        let newRotation = prev.rotation;
        if (dx !== 0 || dy !== 0) {
          newRotation = Math.atan2(dy, dx);
        }

        return {
          x: newX,
          y: newY,
          rotation: newRotation,
          velocity: { x: dx, y: dy }
        };
      });
    };

    const gameLoop = setInterval(updatePosition, 16);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [boundaries, speed]);

  return fishState;
};
