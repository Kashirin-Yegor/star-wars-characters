import {Character, Planet} from "@/shared/types/character";


export type Id = 'name' |
    'height' |
    'weight' |
    'hair_color' |
    'skin_color' |
    | 'year_of_birth' |
    'gender' |
    'home_planet' |
    'movie' |
    'date_of_creation'

export interface Props {
    isEditing:boolean;
    displayCharacter:Character | null;
    homeworld:Planet | null;
    handleInputChange:(key:string,value:string) => void;
}