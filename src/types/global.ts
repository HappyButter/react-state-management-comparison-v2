export const availableStateManagers = ['None', 'ContextAPI', 'Zustand', 'Redux', 'MobX'] as const;

export type AvailableStateManagerType = typeof availableStateManagers[number];

export type AppConfig = {
  selectedStateManager: AvailableStateManagerType;
  gridSize: number;
};
