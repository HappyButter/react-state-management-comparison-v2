export const availableStateManagers = ['None', 'ContextAPI', 'Zustand', 'Redux'] as const;

export type AvailableStateManagerType = typeof availableStateManagers[number];

export type AppConfig = {
  selectedStateManager: AvailableStateManagerType;
  gridSize: number;
};
