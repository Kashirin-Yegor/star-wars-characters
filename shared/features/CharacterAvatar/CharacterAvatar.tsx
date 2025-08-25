import { useState, useEffect } from 'react';
import { Character } from '@/shared/types/character';
import { ImageWithFallback } from './components/ImageWithFallback';
import { sizeMap } from './CharacterAvatar.constants';
import { CharacterAvatarProps, CharacterType } from './CharacterAvatar.types';
import { generateColorByType, getCharacterIcon } from './CharacterType.utils';

export function CharacterAvatar({
  character,
  size = 'md',
  className = '',
}: CharacterAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Определяем тип персонажа
  const getCharacterType = (character: Character): CharacterType => {
    const name = character.name.toLowerCase();

    // Дроиды
    if (
      name.includes('droid') ||
      name.includes('c-3po') ||
      name.includes('r2-d2') ||
      name.includes('bb-8') ||
      name.includes('r4-p17') ||
      name.includes('r5-d4')
    ) {
      return 'droid';
    }

    // Темная сторона
    if (
      name.includes('vader') ||
      name.includes('palpatine') ||
      name.includes('emperor') ||
      name.includes('dooku') ||
      name.includes('maul') ||
      name.includes('grievous') ||
      name.includes('tarkin') ||
      name.includes('kylo') ||
      name.includes('snoke')
    ) {
      return 'dark';
    }

    // Светлая сторона
    if (
      name.includes('luke') ||
      name.includes('obi-wan') ||
      name.includes('yoda') ||
      name.includes('qui-gon') ||
      name.includes('mace windu') ||
      name.includes('kit fisto') ||
      name.includes('plo koon') ||
      name.includes('aayla secura') ||
      name.includes('shaak ti')
    ) {
      return 'light';
    }

    // Нейтральные персонажи
    return 'neutral';
  };

  // Получаем инициалы
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const fetchCharacterImage = async () => {
      try {
        const characterName = character.name.toLowerCase();

        // Реальные изображения персонажей из фильмов Star Wars
        const characterImages: { [key: string]: string } = {
          'luke skywalker': '/images/luke_skywalker.png',
          'leia organa': '/images/leia_organa.png',
          'han solo': '/images/han_solo.png',
          'obi-wan kenobi': '/images/obi-wan_kenobi.png',
          palpatine: '/images/palpatine.png',
          'r2 d2': '/images/r2_d2.png',
          'darth maul': '/images/darth_maul.png',
        };

        // Проверяем точные совпадения
        if (characterImages[characterName]) {
          setImageUrl(characterImages[characterName]);
          return;
        }

        // Проверяем частичные совпадения
        for (const [key, url] of Object.entries(characterImages)) {
          if (
            characterName.includes(key.split(' ')[0]) ||
            key.includes(characterName.split(' ')[0])
          ) {
            setImageUrl(url);
            return;
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch image for ${character.name}:`, error);
        setImageError(true);
      }
    };

    fetchCharacterImage();
  }, [character.name]);

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const characterType = getCharacterType(character);
  const gradientColor = generateColorByType(characterType);

  const renderFallbackAvatar = () => (
    <div
      className={`${sizeMap[size]} bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white relative rounded-lg`}
    >
      {size === 'xl' ? (
        <div className="text-center">
          {getCharacterIcon(characterType, size)}
          <div className="mt-2 text-lg font-medium">
            {getInitials(character.name)}
          </div>
        </div>
      ) : size === 'lg' ? (
        <>{getCharacterIcon(characterType, size)}</>
      ) : (
        <div className="text-xs font-medium">{getInitials(character.name)}</div>
      )}
    </div>
  );

  return (
    <div
      className={`${sizeMap[size]} rounded-lg overflow-hidden relative ${className}`}
    >
      {imageUrl && !imageError ? (
        <ImageWithFallback
          src={imageUrl}
          alt={character.name}
          className={`${sizeMap[size]} object-cover rounded-lg`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        renderFallbackAvatar()
      )}

      {/* Индикатор типа персонажа в правом нижнем углу */}
      {/* <div className={`absolute ${size === 'xl' ? '-bottom-2 -right-2 w-6 h-6' : size === 'lg' ? '-bottom-1 -right-1 w-4 h-4' : '-bottom-0.5 -right-0.5 w-3 h-3'} rounded-full border-2 border-white ${
        characterType === 'light' ? 'bg-blue-500' :
        characterType === 'dark' ? 'bg-red-500' :
        characterType === 'droid' ? 'bg-gray-500' : 'bg-green-500'
      }`} /> */}
    </div>
  );
}
