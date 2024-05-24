import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { AvailableStateManagerType } from 'types/global';

export interface AppControlContextValue {
  selectedStateManager: AvailableStateManagerType;
  setSelectedStateManager: (stateManager: AvailableStateManagerType) => void;
  gridSize: number;
  setGridSize: Dispatch<SetStateAction<number>>;
}

export const AppControlContext = createContext<AppControlContextValue>({
  selectedStateManager: 'None',
  setSelectedStateManager: () => {
  },
  gridSize: 10,
  setGridSize: () => {
  }
});

export const AppControlProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStateManager, setSelectedStateManager] = useState<AvailableStateManagerType>('None');
  const [gridSize, setGridSize] = useState<number>(10);

  const appControlContextValue = { selectedStateManager, setSelectedStateManager, gridSize, setGridSize };

  return (
    <AppControlContext.Provider value={appControlContextValue}>
      {children}
    </AppControlContext.Provider>
  );
};

export const useAppControl = (): AppControlContextValue => {
  const appControlContextValue = useContext(AppControlContext);

  if (!appControlContextValue) {
    throw Error('AppControlProvider should be in the root of the app');
  }

  return appControlContextValue;
};