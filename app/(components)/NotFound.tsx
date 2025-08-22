import React from 'react';
import {observer, useLocalObservable} from "mobx-react-lite";
import {HomeStore} from "@/app/store";

export const NotFound = observer(() => {
    const store = useLocalObservable(() => new HomeStore());
    return (
        <div className="text-center py-8">
            <p className="text-muted-foreground">
                {store.searchQuery.length > 0 ? "Персонажи не найдены" : "Нет персонажей для отображения"}
            </p>
        </div>
    );
});