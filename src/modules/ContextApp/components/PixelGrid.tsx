import { CSSProperties } from 'react';
import PixelRow from './PixelRow';

type PixelGridProps = {
  size: number;
};

const styles: CSSProperties = {
  height: '65vh',
  aspectRatio: '1/1',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid black',
};

const PixelGrid = ({size}: PixelGridProps) => {
  return (
    <div style={{ ...styles }} data-testid="pixel-grid">
      {Array(size)
        .fill(null)
        .map((_, rowIndex) => (
          <PixelRow key={`PixelRow_${rowIndex}`} rowIndex={rowIndex} size={size}/>
        ))}
    </div>
  );
}

export default PixelGrid;