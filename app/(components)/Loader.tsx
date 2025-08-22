import React from 'react';
import {Loader2} from "lucide-react";
import {useHomeStore} from "@/app/context";
import {observer} from "mobx-react-lite";

export const Loader = observer(() => {
    const store = useHomeStore();

    if(!store.loading) return <></>

    return (
        <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Загрузка персонажей...</span>
        </div>
    );
});