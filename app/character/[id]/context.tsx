'use client';
import {createContext,useContext,FC,ReactNode, useMemo, useEffect} from 'react';
import { CharacterStore } from './store';

export const CharacterStoreContext = createContext<CharacterStore | null>(null);

export const CharacterStoreProvider: FC<{ children: ReactNode,characterId: number }> = ({ children, characterId }) => {
    const store = useMemo(() => new CharacterStore(characterId), [characterId]);
    
    useEffect(() => {
        store.initializeStore();
    }, [store]);
    
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
