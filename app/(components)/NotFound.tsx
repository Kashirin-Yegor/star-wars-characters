import React from 'react';
import {observer} from "mobx-react-lite";
import {useHomeStore} from "@/app/context";

export const NotFound = observer(() => {
    const store = useHomeStore();
    if(!store.loading && !store.error && store.characters.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">
                    {store.searchQuery.length > 0 ? "Персонажи не найдены" : "Нет персонажей для отображения"}
                </p>
            </div>
        );
    }else{
        return <></>
    }
});