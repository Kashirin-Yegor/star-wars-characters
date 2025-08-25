import React from 'react';
import { Input, Label, Select } from '@/shared/ui';
import * as Utils from './utils';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import { Globe } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Id } from './types';
import { useCharacterStore } from '@/app/character/[id]/context';

const RowName = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label htmlFor="name">Имя</Label>
      {isEditing ? (
        <Input
          id="name"
          value={displayCharacter?.name}
          onChange={e => store.handleInputChange('name', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1">{displayCharacter?.name}</p>
      )}
    </div>
  );
});
const RowHeight = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Рост</Label>
      {isEditing ? (
        <Input
          id="height"
          value={displayCharacter?.height}
          onChange={e => store.handleInputChange('height', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1">
          {Utils.formatHeight(displayCharacter?.height ?? 'unknown')}
        </p>
      )}
    </div>
  );
});
const RowWeight = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Вес</Label>
      {isEditing ? (
        <Input
          id="mass"
          value={displayCharacter?.mass}
          onChange={e => store.handleInputChange('mass', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1">
          {Utils.formatMass(displayCharacter?.mass ?? 'unknown')}
        </p>
      )}
    </div>
  );
});
const RowHairColor = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Цвет волос</Label>
      {isEditing ? (
        <Input
          id="hair_color"
          value={displayCharacter?.hair_color}
          onChange={e => store.handleInputChange('hair_color', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1 capitalize">{displayCharacter?.hair_color}</p>
      )}
    </div>
  );
});
const RowSkinColor = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Цвет кожи</Label>
      {isEditing ? (
        <Input
          id="skin_color"
          value={displayCharacter?.skin_color}
          onChange={e => store.handleInputChange('skin_color', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1 capitalize">{displayCharacter?.skin_color}</p>
      )}
    </div>
  );
});
const RowEyeColor = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Цвет глаз</Label>
      {isEditing ? (
        <Input
          id="eye_color"
          value={displayCharacter?.eye_color}
          onChange={e => store.handleInputChange('eye_color', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1 capitalize">{displayCharacter?.eye_color}</p>
      )}
    </div>
  );
});

const RowYearOfBirth = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Год рождения</Label>
      {isEditing ? (
        <Input
          id="birth_year"
          value={displayCharacter?.birth_year}
          onChange={e => store.handleInputChange('birth_year', e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="mt-1">{displayCharacter?.birth_year}</p>
      )}
    </div>
  );
});

const RowGender = observer(() => {
  const store = useCharacterStore();
  const { isEditing } = store;
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Пол</Label>
      {isEditing ? (
        <Select
          value={displayCharacter?.gender}
          onValueChange={value => store.handleInputChange('gender', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Мужской</SelectItem>
            <SelectItem value="female">Женский</SelectItem>
            <SelectItem value="hermaphrodite">Гермафродит</SelectItem>
            <SelectItem value="n/a">Неприменимо</SelectItem>
            <SelectItem value="unknown">Неизвестно</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <p className="mt-1">
          {Utils.getGenderDisplay(displayCharacter?.gender)}
        </p>
      )}
    </div>
  );
});
const RowHomePlanet = observer(() => {
  const store = useCharacterStore();
  const { homeworld } = store;
  return (
    <div className="col-span-2">
      <Label className="flex items-center gap-2">
        <Globe className="w-4 h-4" />
        Домашняя планета
      </Label>
      <p className="mt-1">{homeworld ? homeworld.name : 'Загрузка...'}</p>
      {homeworld && (
        <div className="mt-1 text-xs text-muted-foreground space-y-1">
          <p>Климат: {homeworld.climate}</p>
          <p>Ландшафт: {homeworld.terrain}</p>
          <p>
            Население:{' '}
            {homeworld.population !== 'unknown'
              ? homeworld.population
              : 'Неизвестно'}
          </p>
        </div>
      )}
    </div>
  );
});
const RowMovie = observer(() => {
  const store = useCharacterStore();
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Фильмы</Label>
      <p className="mt-1">{displayCharacter?.films.length} фильм(ов)</p>
    </div>
  );
});
const RowDateOfCreation = observer(() => {
  const store = useCharacterStore();
  const displayCharacter = store.editedCharacter || store.character;
  return (
    <div>
      <Label>Создан</Label>
      {displayCharacter?.created && (
        <p className="mt-1 text-muted-foreground">
          {new Date(displayCharacter.created).toLocaleDateString('ru-RU')}
        </p>
      )}
    </div>
  );
});

export const Row = observer(({ id }: { id: Id }) => {
  if (id === 'name') {
    return <RowName />;
  }
  if (id === 'height') {
    return <RowHeight />;
  }
  if (id === 'weight') {
    return <RowWeight />;
  }
  if (id === 'hair_color') {
    return <RowHairColor />;
  }
  if (id === 'skin_color') {
    return <RowSkinColor />;
  }
  if (id === 'eye_color') {
    return <RowEyeColor />;
  }
  if (id === 'year_of_birth') {
    return <RowYearOfBirth />;
  }
  if (id === 'gender') {
    return <RowGender />;
  }
  if (id === 'home_planet') {
    return <RowHomePlanet />;
  }
  if (id === 'movie') {
    return <RowMovie />;
  }
  if (id === 'date_of_creation') {
    return <RowDateOfCreation />;
  }
});
