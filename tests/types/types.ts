export const availableStateManagers = ['None', 'ContextAPI', 'Zustand', 'Redux'] as const;

export type StateManagerType = typeof availableStateManagers[number];