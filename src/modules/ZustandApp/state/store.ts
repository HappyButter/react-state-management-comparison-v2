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
  setPixelRowColor: (rowIndex: number, color: string) => void
  swapRows: (rowIndex1: number, rowIndex2: number) => void
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
      const newPixels = state.pixels.slice();
      newPixels[rowIndex][colIndex] = { color };
      return { pixels: newPixels };
    }),
  setPixelRowColor: (rowIndex, color) =>
    set((state) => {
      const newPixels = state.pixels.slice();
      for (let i = 0; i < newPixels[rowIndex].length; i++) {
        newPixels[rowIndex][i] = { color };
      }
      return { pixels: newPixels };
    }),
  swapRows: (rowIndex1, rowIndex2) =>
    set((state) => {
      const pixels = state.pixels.slice();
      const temp = pixels[rowIndex1];
      pixels[rowIndex1] = pixels[rowIndex2];
      pixels[rowIndex2] = temp;

      return { pixels };
    })
}));