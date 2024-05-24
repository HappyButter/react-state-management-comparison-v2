import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type Pixel = {
  color: string;
}

type ContextState = {
  pixels: Pixel[][];
}

type ContextActions = {
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

const initialState: ContextState = {
  pixels: []
};

const initialActions: ContextActions = {
  setupPixels: () => {
  },
  setPixelColor: () => {
  }
};

const PixelContext = createContext<ContextState & ContextActions>({ ...initialState, ...initialActions });

const usePixelsContext = () => useContext(PixelContext);

const PixelProvider = ({ children }: { children: ReactNode }) => {
  const [pixels, setPixels] = useState<ContextState['pixels']>(initialState.pixels);

  const setupPixels = useCallback((size: number) => {
    setPixels(
      Array.from({ length: size }, (_, rowIndex) =>
        Array.from({ length: size }, (_, colIndex) => ({
          color: getPixelColor(rowIndex, colIndex)
        })))
    );
  }, [setPixels]);

  const setPixelColor = (rowIndex: number, colIndex: number, color: string) => {
    setPixels((state) => {
      const row = [...state[rowIndex]];
      const resultRow = row.map((pixel, index) => {
        if (index === colIndex) {
          return { color };
        }
        return pixel;
      });

      return [...state.slice(0, rowIndex), resultRow, ...state.slice(rowIndex + 1)];
    });
  };

  const state = {
    pixels,
    setupPixels,
    setPixelColor
  };

  return (
    <PixelContext.Provider value={state}>
      {children}
    </PixelContext.Provider>
  );
};

export { PixelProvider, usePixelsContext };


