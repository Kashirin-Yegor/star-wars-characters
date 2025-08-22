import React from 'react';
import {Button} from "@/shared/ui";
import {observer, useLocalObservable} from "mobx-react-lite";
import {HomeStore} from "@/app/store";

export const ErrorLayout = observer(() => {
    const store = useLocalObservable(() => new HomeStore());
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