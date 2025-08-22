'use client';
import {createContext,useContext,useMemo,FC,ReactNode} from 'react';
import { CharacterStore } from './store';
import {useLocalObservable} from "mobx-react-lite";

export const CharacterStoreContext = createContext<CharacterStore | null>(null);

export const CharacterStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const store = useLocalObservable(() => new CharacterStore());
    return (
        <CharacterStoreContext.Provider value={store}>
            {children}
        </CharacterStoreContext.Provider>
    );
};

export const useCharacterStore = () => {
    const store = useContext(CharacterStoreContext);
    if (!store) throw new Error("useHomeStore must be used within HomeStoreProvider");
    return store;
};
