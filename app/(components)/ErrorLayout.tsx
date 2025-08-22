import React from 'react';
import {Button} from "@/shared/ui";
import {observer} from "mobx-react-lite";
import {useHomeStore} from "@/app/context";

export const ErrorLayout = observer(() => {
    const store = useHomeStore();

    if(!store.error) return <></>

    return (
        <div className="text-center py-8">
            <p className="text-destructive">{store.error}</p>
            <Button
                onClick={() => store.fetchCharacters()}
                className="mt-4"
            >
                Попробовать снова
            </Button>
        </div>
    );
});