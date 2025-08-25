'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Card as CardContainer,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card';
import { CharacterAvatar } from '@/shared/features/CharacterAvatar';
import { Badge } from '@/shared/ui';
import { Actions, ErrorLayout, Loader, Row } from './components';
import { useCharacterStore } from '../../context';
import { Id } from './components/Row/types';

const fields: Id[] = [
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
  'date_of_creation',
];

export const Card = observer(() => {
  const store = useCharacterStore();

  if (store.loading) {
    return <Loader />;
  }

  if (store.error || !store.character) {
    return <ErrorLayout />;
  }

  const displayCharacter = store.editedCharacter || store.character;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Левая колонка: аватар */}
      <CardContainer>
        <CardContent className="p-6 flex flex-col items-center">
          <CharacterAvatar
            character={displayCharacter}
            size="xl"
            className="mb-4"
          />
          <h2 className="text-center">{displayCharacter.name}</h2>
          {displayCharacter.birth_year !== 'unknown' && (
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
          {fields.map(id => {
            return <Row key={id} id={id} />;
          })}
        </CardContent>
      </CardContainer>
    </div>
  );
});
