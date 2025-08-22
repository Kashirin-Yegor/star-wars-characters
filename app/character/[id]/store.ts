import {makeAutoObservable} from "mobx";
import {Character, Planet} from "@/shared/types/character";
import {charactersApi} from "@/services/api";
import {LOCAL_STORAGE_KEY} from "@/shared/constants";
import {toast} from "sonner";


export class CharacterStore {
    loading = true;
    isEditing = false;
    editedCharacter:null | Character = null;
    character:null | Character = null;
    homeworld:null | Planet = null;
    error:null | string = null;
    originalName = "";

    constructor() {
        makeAutoObservable(this);
    }

    private setLoading(value: boolean) {
        this.loading = value;
    }

    private setIsEditing(value: boolean) {
        this.isEditing = value;
    }

    private setEditedCharacter(value: Character | null) {
        this.editedCharacter = value;
    }

    private setCharacter(value: Character | null) {
        this.character = value;
    }

    private setHomeworld(value: Planet | null) {
        this.homeworld = value;
    }

    private setError(value: null | string) {
        this.error = value;
    }

    private setOriginalName(value: string) {
        this.originalName = value;
    }

    private getLocalEdits  (): Record<string, Character> {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    };

    public async fetchCharacter(id: number) {
        try {
            this.setLoading(true);
            this.setError(null);
            const data = await charactersApi.getCharacter(id);
            this.setOriginalName(data.name);

            const localEdits = this.getLocalEdits();
            const characterWithEdits = { ...data, ...localEdits[data.name] };

            this.setCharacter(characterWithEdits);
            this.setEditedCharacter(characterWithEdits);

            if (characterWithEdits.homeworld) {
                try {
                    const planetData = await charactersApi.getPlanet(characterWithEdits.homeworld);
                    this.setHomeworld(planetData);
                } catch {
                    console.warn("Failed to load homeworld data");
                }
            }
        } catch {
            this.setError("Не удалось загрузить персонажа");
        } finally {
            this.setLoading(false);
        }
    };

    private saveLocalEdits = (edits: Partial<Character>) => {
        try {
            const currentEdits = this.getLocalEdits();
            const updatedEdits = {
                ...currentEdits,
                [this.originalName]: { ...currentEdits[this.originalName], ...edits }
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEdits));
        } catch (err) {
            console.error("Failed to save edits:", err);
        }
    };

    public handleSave  ()  {
        if (!this.character || !this.editedCharacter || !this.character.id) return;

        const changes: Partial<Character> = {};
        if (this.editedCharacter.name !== this.character.name) changes.name = this.editedCharacter.name;
        if (this.editedCharacter.height !== this.character.height) changes.height = this.editedCharacter.height;
        if (this.editedCharacter.mass !== this.character.mass) changes.mass = this.editedCharacter.mass;
        if (this.editedCharacter.hair_color !== this.character.hair_color) changes.hair_color = this.editedCharacter.hair_color;
        if (this.editedCharacter.skin_color !== this.character.skin_color) changes.skin_color = this.editedCharacter.skin_color;
        if (this.editedCharacter.eye_color !== this.character.eye_color) changes.eye_color = this.editedCharacter.eye_color;
        if (this.editedCharacter.birth_year !== this.character.birth_year) changes.birth_year = this.editedCharacter.birth_year;
        if (this.editedCharacter.gender !== this.character.gender) changes.gender = this.editedCharacter.gender;

        if (Object.keys(changes).length > 0) {
            this.saveLocalEdits(changes);
            this.setCharacter(this.editedCharacter);
            toast.success("Изменения сохранены локально");
        }

        this.setIsEditing(false);
    };

    public handleCancel()  {
        this.setEditedCharacter(this.character);
        this.setIsEditing(false);
    };

    public handleInputChange(field: string, value: string)  {
        if (!this.editedCharacter) return;
        this.setEditedCharacter({
            ...this.editedCharacter,
            [field]: value
        });
    };

    public handleOnEdit(){
        this.setIsEditing(true)
    }
}