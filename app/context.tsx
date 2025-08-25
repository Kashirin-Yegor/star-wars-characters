'use client';
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';
import { HomeStore } from './store';

export const HomeStoreContext = createContext<HomeStore | null>(null);

export const HomeStoreProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const store = useMemo(() => new HomeStore(), []);

  useEffect(() => {
    store.initializeStore();

    return () => {
      store.cleanup();
    };
  }, [store]);

  return (
    <HomeStoreContext.Provider value={store}>
      {children}
    </HomeStoreContext.Provider>
  );
};

export const useHomeStore = () => {
  const store = useContext(HomeStoreContext);
  if (!store)
    throw new Error('useHomeStore must be used within HomeStoreProvider');
  return store;
};
