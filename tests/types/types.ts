export const availableStateManagers = ['None', 'ContextAPI', 'Zustand', 'Redux', 'MobX'] as const;

export type StateManagerType = typeof availableStateManagers[number];

export type AggregatedResultsByTestType = {
  [key: string]: {
    [key: number]: {
      title: string;
      dataLabels: string[];
      chartData: number[][];
    };
  };
};