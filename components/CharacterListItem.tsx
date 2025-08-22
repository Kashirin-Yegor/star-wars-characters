import { Character } from "@/shared/types/character";
import { Badge } from "@/shared/ui/Badge";
import { CharacterAvatar } from "./CharacterAvatar";

interface CharacterListItemProps {
  character: Character;
  onClick: (character: Character) => void;
}

export function CharacterListItem({ character, onClick }: CharacterListItemProps) {
  const formatHeight = (height: string) => {
    if (height === "unknown") return "Неизвестно";
    return `${height} см`;
  };

  const formatMass = (mass: string) => {
    if (mass === "unknown") return "Неизвестно";
    return `${mass} кг`;
  };

  return (
    <div 
      className="flex items-center space-x-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors"
      onClick={() => onClick(character)}
    >
      <CharacterAvatar character={character} size="md" />
      <div className="flex-1 min-w-0">
        <h3 className="truncate">{character.name}</h3>
        <p className="text-muted-foreground text-sm">
          {formatHeight(character.height)} • {formatMass(character.mass)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">
          {character.gender === "male" ? "Мужской" : 
           character.gender === "female" ? "Женский" :
           character.gender === "hermaphrodite" ? "Гермафродит" : "Неизвестно"}
        </Badge>
        {character.birth_year !== "unknown" && (
          <div className="text-muted-foreground text-sm">
            {character.birth_year}
          </div>
        )}
      </div>
    </div>
  );
}