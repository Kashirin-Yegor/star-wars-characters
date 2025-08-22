import React from 'react';
import {Button} from "@/shared/ui";
import {ArrowLeft} from "lucide-react";
import {observer, useLocalObservable} from "mobx-react-lite";
import {CharacterStore} from "../store";
import {useRouter} from "next/navigation";

export const ErrorLayout = observer(() => {
    const store = useLocalObservable(() => new CharacterStore());
    const router = useRouter();
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-destructive">{store.error || "Персонаж не найден"}</p>
            <Button onClick={() => router.push("/")} className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Назад к списку
            </Button>
        </div>
    );
});