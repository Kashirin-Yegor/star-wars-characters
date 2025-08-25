'use client';

import { Character } from '@/shared/types/character';
import { Card, CardContent } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { CharacterAvatar } from '@/shared/features/CharacterAvatar';
import { observer } from 'mobx-react-lite';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard = observer(
  ({ character, onClick }: CharacterCardProps) => {
    const formatHeight = (height: string) => {
      if (height === 'unknown') return 'Неизвестно';
      return `${height} см`;
    };

    return (
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onClick(character)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <CharacterAvatar character={character} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="truncate">{character.name}</h3>
              <p className="text-muted-foreground text-sm">
                Рост: {formatHeight(character.height)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  {character.gender === 'male'
                    ? 'Мужской'
                    : character.gender === 'female'
                      ? 'Женский'
                      : character.gender === 'hermaphrodite'
                        ? 'Гермафродит'
                        : 'Неизвестно'}
                </Badge>
                {character.birth_year !== 'unknown' && (
                  <Badge variant="outline" className="text-xs">
                    {character.birth_year}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
