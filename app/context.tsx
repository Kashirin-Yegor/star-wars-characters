'use client';
import {createContext,useContext,useMemo,FC,ReactNode} from 'react';
import { HomeStore } from './store';
import {useLocalObservable} from "mobx-react-lite";

export const HomeStoreContext = createContext<HomeStore | null>(null);

export const HomeStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const store = useLocalObservable(() => new HomeStore());
    return (
        <HomeStoreContext.Provider value={store}>
            {children}
        </HomeStoreContext.Provider>
    );
};

export const useHomeStore = () => {
    const store = useContext(HomeStoreContext);
    if (!store) throw new Error("useHomeStore must be used within HomeStoreProvider");
    return store;
};
