"use client";

export const dynamic = "force-dynamic";
import React, {useEffect} from 'react';
import {CharacterCard} from "./components/CharacterCard";
import {CharacterListItem} from "./components/CharacterListItem";
import {Pagination} from "@/shared/ui/Pagination";
import {Character} from "@/shared/types/character";
import {useRouter} from "next/navigation";
import {useHomeStore} from "../../context"
import { observer } from 'mobx-react-lite';


export const Table = observer(() => {
    const store = useHomeStore();
    const router = useRouter();

    const handleCharacterClick = (character: Character) => {
        router.push(`/character/${character.id}`);
    };

    return (
        <>
            {!store.loading && !store.error && store.characters.length > 0 && (
                <>
                    {store.isCardView ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {store.characters.map((character) => (
                                <CharacterCard
                                    key={character.id}
                                    character={character}
                                    onClick={handleCharacterClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {store.characters.map((character) => (
                                <CharacterListItem
                                    key={character.id}
                                    character={character}
                                    onClick={handleCharacterClick}
                                />
                            ))}
                        </div>
                    )}

                    {/* Пагинация */}
                    {store.totalPages > 1 && (
                        <div className="flex justify-center">
                            <Pagination
                                currentPage={store.currentPage}
                                totalPages={store.totalPages}
                                onPageChange={(page) => store.handlePageChange(page)}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
});