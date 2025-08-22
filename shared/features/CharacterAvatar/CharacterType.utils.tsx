import {CharacterType} from "./CharacterAvatar.types";
import { User, Zap, Crown, Sword, Users } from "lucide-react";
import {iconSizeMap} from "./CharacterAvatar.constants";

// Генерируем цвет на основе типа персонажа
export const generateColorByType = (type: CharacterType) => {
    switch (type) {
      case "light":
        return "from-blue-400 to-cyan-600";
      case "dark":
        return "from-red-600 to-red-800";
      case "droid":
        return "from-gray-400 to-gray-600";
      case "neutral":
        return "from-green-500 to-emerald-600";
    }
};

  // Получаем иконку на основе типа персонажа
export const getCharacterIcon = (type: CharacterType,size:keyof typeof iconSizeMap) => {
    switch (type) {
      case "light":
        return <Sword className={`${iconSizeMap[size]}`} />;
      case "dark":
        return <Crown className={`${iconSizeMap[size]}`} />;
      case "droid":
        return <Zap className={`${iconSizeMap[size]}`} />;
      case "neutral":
        return <Users className={`${iconSizeMap[size]}`} />;
      default:
        return <User className={`${iconSizeMap[size]}`} />;
    }
};