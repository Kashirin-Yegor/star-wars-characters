"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Character, LocalCharacterEdits, Planet } from "../types/character";
import { charactersApi } from "../services/api";
import { CharacterAvatar } from "./CharacterAvatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Edit2, Save, X, Loader2, Globe } from "lucide-react";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "sw_character_edits";

export function CharacterDetailPageClient() {
  const router = useRouter();
  const params = useParams();
  const characterId = params?.id as string;

  const [character, setCharacter] = useState<Character | null>(null);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<Character | null>(null);

  const [originalName,setOriginalName] = useState<string>("");

  useEffect(() => {
    if (characterId) {
      fetchCharacter(parseInt(characterId));
    }
  }, [characterId]);

  const fetchCharacter = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await charactersApi.getCharacter(id);
      setOriginalName(data.name);

      const localEdits = getLocalEdits();
      const characterWithEdits = { ...data, ...localEdits[id] };

      setCharacter(characterWithEdits);
      setEditedCharacter(characterWithEdits);

      if (characterWithEdits.homeworld) {
        try {
          const planetData = await charactersApi.getPlanet(characterWithEdits.homeworld);
          setHomeworld(planetData);
        } catch {
          console.warn("Failed to load homeworld data");
        }
      }
    } catch {
      setError("Не удалось загрузить персонажа");
    } finally {
      setLoading(false);
    }
  };

  const getLocalEdits = (): LocalCharacterEdits => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const saveLocalEdits = (edits: Partial<Character>) => {
    try {
      const currentEdits = getLocalEdits();
      const updatedEdits = {
        ...currentEdits,
        [originalName]: { ...currentEdits[originalName], ...edits }
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEdits));
    } catch (err) {
      console.error("Failed to save edits:", err);
    }
  };

  const handleSave = () => {
    if (!character || !editedCharacter || !character.id) return;

    const changes: Partial<Character> = {};
    if (editedCharacter.name !== character.name) changes.name = editedCharacter.name;
    if (editedCharacter.height !== character.height) changes.height = editedCharacter.height;
    if (editedCharacter.mass !== character.mass) changes.mass = editedCharacter.mass;
    if (editedCharacter.hair_color !== character.hair_color) changes.hair_color = editedCharacter.hair_color;
    if (editedCharacter.skin_color !== character.skin_color) changes.skin_color = editedCharacter.skin_color;
    if (editedCharacter.eye_color !== character.eye_color) changes.eye_color = editedCharacter.eye_color;
    if (editedCharacter.birth_year !== character.birth_year) changes.birth_year = editedCharacter.birth_year;
    if (editedCharacter.gender !== character.gender) changes.gender = editedCharacter.gender;

    if (Object.keys(changes).length > 0) {
      saveLocalEdits(changes);
      setCharacter(editedCharacter);
      toast.success("Изменения сохранены локально");
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (!editedCharacter) return;
    setEditedCharacter({
      ...editedCharacter,
      [field]: value
    });
  };

  const formatHeight = (height: string) => height === "unknown" ? "Неизвестно" : `${height} см`;
  const formatMass = (mass: string) => mass === "unknown" ? "Неизвестно" : `${mass} кг`;

  const getGenderDisplay = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male": return "Мужской";
      case "female": return "Женский";
      case "hermaphrodite": return "Гермафродит";
      case "n/a": return "Неприменимо";
      default: return "Неизвестно";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Загрузка персонажа...</span>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive">{error || "Персонаж не найден"}</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Назад к списку
        </Button>
      </div>
    );
  }

  const displayCharacter = editedCharacter || character;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.push("/")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Назад к списку
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка: аватар */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <CharacterAvatar character={displayCharacter} size="xl" className="mb-4" />
            <h2 className="text-center">{displayCharacter.name}</h2>
            {displayCharacter.birth_year !== "unknown" && (
              <Badge variant="outline" className="mt-2">
                {displayCharacter.birth_year}
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Правая колонка: инфа */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Информация о персонаже</CardTitle>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" /> Сохранить
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" /> Отмена
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" /> Редактировать
                </Button>
              )}
            </div>
          </CardHeader>

          {/* сетка для всех полей */}
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
            {/* Имя */}
            <div>
              <Label htmlFor="name">Имя</Label>
              {isEditing ? (
                <Input id="name" value={displayCharacter.name} onChange={(e) => handleInputChange("name", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1">{displayCharacter.name}</p>
              )}
            </div>

            {/* Рост */}
            <div>
              <Label>Рост</Label>
              {isEditing ? (
                <Input id="height" value={displayCharacter.height} onChange={(e) => handleInputChange("height", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1">{formatHeight(displayCharacter.height)}</p>
              )}
            </div>

            {/* Вес */}
            <div>
              <Label>Вес</Label>
              {isEditing ? (
                <Input id="mass" value={displayCharacter.mass} onChange={(e) => handleInputChange("mass", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1">{formatMass(displayCharacter.mass)}</p>
              )}
            </div>

            {/* Цвет волос */}
            <div>
              <Label>Цвет волос</Label>
              {isEditing ? (
                <Input id="hair_color" value={displayCharacter.hair_color} onChange={(e) => handleInputChange("hair_color", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1 capitalize">{displayCharacter.hair_color}</p>
              )}
            </div>

            {/* Цвет кожи */}
            <div>
              <Label>Цвет кожи</Label>
              {isEditing ? (
                <Input id="skin_color" value={displayCharacter.skin_color} onChange={(e) => handleInputChange("skin_color", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1 capitalize">{displayCharacter.skin_color}</p>
              )}
            </div>

            {/* Цвет глаз */}
            <div>
              <Label>Цвет глаз</Label>
              {isEditing ? (
                <Input id="eye_color" value={displayCharacter.eye_color} onChange={(e) => handleInputChange("eye_color", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1 capitalize">{displayCharacter.eye_color}</p>
              )}
            </div>

            {/* Год рождения */}
            <div>
              <Label>Год рождения</Label>
              {isEditing ? (
                <Input id="birth_year" value={displayCharacter.birth_year} onChange={(e) => handleInputChange("birth_year", e.target.value)} className="mt-1" />
              ) : (
                <p className="mt-1">{displayCharacter.birth_year}</p>
              )}
            </div>

            {/* Пол */}
            <div>
              <Label>Пол</Label>
              {isEditing ? (
                <Select value={displayCharacter.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Мужской</SelectItem>
                    <SelectItem value="female">Женский</SelectItem>
                    <SelectItem value="hermaphrodite">Гермафродит</SelectItem>
                    <SelectItem value="n/a">Неприменимо</SelectItem>
                    <SelectItem value="unknown">Неизвестно</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1">{getGenderDisplay(displayCharacter.gender)}</p>
              )}
            </div>

            {/* Домашняя планета */}
            <div className="col-span-2">
              <Label className="flex items-center gap-2"><Globe className="w-4 h-4" />Домашняя планета</Label>
              <p className="mt-1">{homeworld ? homeworld.name : "Загрузка..."}</p>
              {homeworld && (
                <div className="mt-1 text-xs text-muted-foreground space-y-1">
                  <p>Климат: {homeworld.climate}</p>
                  <p>Ландшафт: {homeworld.terrain}</p>
                  <p>Население: {homeworld.population !== "unknown" ? homeworld.population : "Неизвестно"}</p>
                </div>
              )}
            </div>

            {/* Фильмы */}
            <div>
              <Label>Фильмы</Label>
              <p className="mt-1">{displayCharacter.films.length} фильм(ов)</p>
            </div>

            {/* Дата создания */}
            <div>
              <Label>Создан</Label>
              <p className="mt-1 text-muted-foreground">
                {new Date(displayCharacter.created).toLocaleDateString("ru-RU")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
