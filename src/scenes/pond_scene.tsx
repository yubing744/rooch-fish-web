import { Container, Graphics, Stage } from '@pixi/react';
import { useMemo } from 'react';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';
import { Fish } from '../components/fish';
import { Food } from '../components/food';
import { useFishController } from '../hooks/useFishController';

export const PondScene = () => {
  // Filters for water effect
  const waterFilters = useMemo(() => {
    const blur = new BlurFilter(2);
    const colorMatrix = new ColorMatrixFilter();
    
    // Add slight blue tint to create water effect
    colorMatrix.brightness(1.1);
    colorMatrix.tint(0x4FA4FF, 0.2);
    
    return [blur, colorMatrix];
  }, []);

  // Stage dimensions
  const width = 800;
  const height = 600;

  const boundaries = useMemo(() => ({
    minX: 40,
    maxX: width - 80,
    minY: 40,
    maxY: height - 80
  }), [width, height]);

  const fishState = useFishController(100, 100, boundaries);

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

  return (
    <Stage 
      width={width} 
      height={height} 
      options={{ 
        backgroundColor: 0xADD8E6,
        antialias: true 
      }}
    >
      <Container>
        {/* Pond background with water effect */}
        <Graphics
          draw={g => {
            // Draw pond shape with rounded corners
            g.clear();
            g.beginFill(0x4FA4FF, 0.3);
            g.drawRoundedRect(20, 20, width - 40, height - 40, 15);
            g.endFill();
          }}
          filters={waterFilters}
        />
        
        {/* Pond border */}
        <Graphics
          draw={g => {
            g.clear();
            g.lineStyle(4, 0x2980B9);
            g.drawRoundedRect(20, 20, width - 40, height - 40, 15);
          }}
        />

        {/* Container for fish (will be added later) */}
        <Container name="fishContainer" x={20} y={20}>
          <Fish 
            x={fishState.x} 
            y={fishState.y} 
            rotation={fishState.rotation}
            scale={0.8} 
          />

          {foodItems.map((food, index) => (
            <Food
              key={`food-${index}`}
              x={food.x}
              y={food.y}
              size={food.size}
              color={food.color}
            />
          ))}
        </Container>
      </Container>
    </Stage>
  );
};
