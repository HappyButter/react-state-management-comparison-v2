import { create } from 'zustand';

type Pixel = {
  color: string
}

type ZustandState = {
  pixels: Pixel[][];
}

type ZustandActions = {
  setupPixels: (size: number) => void
  setPixelColor: (x: number, y: number, color: string) => void
}

const getPixelColor = (rowIndex: number, colIndex: number) => {
  const isEvenRow = rowIndex % 2 === 0;
  const isEvenCol = colIndex % 2 === 0;
  return isEvenRow ?
    isEvenCol ? 'blue' : 'pink' :
    isEvenCol ? 'green' : 'yellow';

};

export const usePixelsStore = create<ZustandState & ZustandActions>((set) => ({
  pixels: [],
  setupPixels: (size) => {
    set({
      pixels: Array.from({ length: size }, (_, rowIndex) =>
        Array.from({ length: size }, (_, colIndex) => ({
          color: getPixelColor(rowIndex, colIndex)
        }))
      )
    });
  },
  setPixelColor: (rowIndex, colIndex, color) =>
    set((state) => {
      const pixels = [...state.pixels];
      pixels[rowIndex][colIndex] = { color };
      return { pixels };
    })
}));