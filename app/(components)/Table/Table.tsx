import React from 'react';
import {CharacterCard} from "@/components/CharacterCard";
import {CharacterListItem} from "@/components/CharacterListItem";
import {Pagination} from "@/shared/ui/Pagination";
import {useLocalObservable} from "mobx-react-lite";
import {HomeStore} from "@/app/store";
import {Character} from "@/shared/types/character";
import {useRouter} from "next/navigation";

export const Table = () => {
    const store = useLocalObservable(() => new HomeStore());
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
                                onPageChange={store.handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};