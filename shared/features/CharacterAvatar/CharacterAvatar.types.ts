import { Character } from '@/shared/types/character';

export interface CharacterAvatarProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export type CharacterType = 'light' | 'dark' | 'droid' | 'neutral';
