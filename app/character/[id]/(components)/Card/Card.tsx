"use client";

import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Card as CardContainer,CardContent, CardHeader, CardTitle} from "@/shared/ui/Card";
import {CharacterAvatar} from "@/components/CharacterAvatar";
import {Badge} from "@/shared/ui";
import {Actions, ErrorLayout, Loader, Row} from "@/app/character/[id]/(components)";
import {useCharacterStore} from "@/app/character/[id]/context";
import {useParams} from "next/navigation";

const fields = [
    'name',
    'height',
    'weight',
    'hair_color',
    'skin_color',
    'eye_color',
    'year_of_birth',
    'gender',
    'home_planet',
    'movie',
    'date_of_creation'
]

export const Card = observer(() => {
    const store = useCharacterStore();
    const params = useParams();
    const characterId = params?.id as string;

    useEffect(() => {
        if (characterId) {
            store.fetchCharacter(Number(characterId));
        }
    }, [characterId]);

    if (store.loading) {
        return <Loader />
    }

    if (store.error || !store.character) {
        return <ErrorLayout />
    }

    const displayCharacter = store.editedCharacter || store.character;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Левая колонка: аватар */}
            <CardContainer>
                <CardContent className="p-6 flex flex-col items-center">
                    <CharacterAvatar character={displayCharacter} size="xl" className="mb-4" />
                    <h2 className="text-center">{displayCharacter.name}</h2>
                    {displayCharacter.birth_year !== "unknown" && (
                        <Badge variant="outline" className="mt-2">
                            {displayCharacter.birth_year}
                        </Badge>
                    )}
                </CardContent>
            </CardContainer>

            {/* Правая колонка: инфа */}
            <CardContainer className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle>Информация о персонаже</CardTitle>
                    <Actions />
                </CardHeader>

                {/* сетка для всех полей */}
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
                    {fields.map((id) => {
                        return  <Row key={id} id={id} />
                    })}
                </CardContent>
            </CardContainer>
        </div>
    );
});