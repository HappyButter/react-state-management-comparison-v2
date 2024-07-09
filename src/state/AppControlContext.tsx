import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { AppConfig } from 'types/global';
import { initAppConfig } from './initState.ts';

export interface AppControlContextValue {
  appConfig: AppConfig;
  setAppConfig: Dispatch<SetStateAction<AppConfig>>;
}

export const AppControlContext = createContext<AppControlContextValue>({
  appConfig: { ...initAppConfig },
  setAppConfig: () => {
  }
});

export const AppControlProvider = ({ children }: { children: ReactNode }) => {
  const [appConfig, setAppConfig] = useState<AppConfig>({ ...initAppConfig });

  const appControlContextValue = { appConfig, setAppConfig };

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