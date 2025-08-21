"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Character, ApiResponse } from "../types/character";
import { charactersApi } from "../services/api";
import { CharacterCard } from "./CharacterCard";
import { CharacterListItem } from "./CharacterListItem";
import { PaginationComponent } from "./PaginationComponent";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Search, Grid, List, Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCardView, setIsCardView] = useState(true);
  const router = useRouter();

  const prepareCharacters = (originalData:Character[]): Character[] => {
    try{
      const cache = localStorage.getItem("sw_character_edits");
      const chacheData = cache ? JSON.parse(cache) : {};
      return originalData.map((el) => {
        const find_cache = chacheData[el.name] ?? {};
        return {...el,...find_cache};
      });
    }catch(e){
      console.log(e);
      return [];
    }
  };

  const fetchCharacters = async (page = 1, search = "") => {
    try {
      setLoading(true);
      setError(null);
      const data: ApiResponse = await charactersApi.getCharacters(page, search);
      setCharacters(prepareCharacters(data.results));
      setTotalPages(Math.ceil(data.count / 10)); // SWAPI возвращает 10 результатов на страницу
    } catch{
      setError("Не удалось загрузить персонажей");
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCharacters(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCharacterClick = (character: Character) => {
    router.push(`/character/${character.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Персонажи Звездных войн</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Поиск и переключатель вида */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск персонажей..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <List className="w-4 h-4" />
              <Switch
                checked={isCardView}
                onCheckedChange={setIsCardView}
                id="view-mode"
              />
              <Grid className="w-4 h-4" />
              <Label htmlFor="view-mode" className="text-sm">
                {isCardView ? "Карточки" : "Список"}
              </Label>
            </div>
          </div>

          {/* Загрузка */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Загрузка персонажей...</span>
            </div>
          )}

          {/* Ошибка */}
          {error && (
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <Button
                onClick={() => fetchCharacters(currentPage, searchQuery)}
                className="mt-4"
              >
                Попробовать снова
              </Button>
            </div>
          )}

          {/* Персонажи */}
          {!loading && !error && characters.length > 0 && (
            <>
              {isCardView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {characters.map((character) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      onClick={handleCharacterClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {characters.map((character) => (
                    <CharacterListItem
                      key={character.id}
                      character={character}
                      onClick={handleCharacterClick}
                    />
                  ))}
                </div>
              )}

              {/* Пагинация */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}

          {/* Нет результатов */}
          {!loading && !error && characters.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchQuery ? "Персонажи не найдены" : "Нет персонажей для отображения"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}