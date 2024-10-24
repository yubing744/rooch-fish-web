import { Container, Graphics, Stage } from '@pixi/react';
import { useMemo } from 'react';
import { BlurFilter, ColorMatrixFilter } from 'pixi.js';

export const Pond = () => {
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
          {/* Fish will be rendered here */}
        </Container>
      </Container>
    </Stage>
  );
};
