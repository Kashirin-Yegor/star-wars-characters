import { ApiResponse, Character, Planet } from "../types/character";

const BASE_URL = "https://swapi.py4e.com/api";

// Извлекаем ID из URL
const extractIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? parseInt(matches[1]) : 0;
};

export const charactersApi = {
  getCharacters: async (page = 1, search = ""): Promise<ApiResponse> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (search) {
      params.append("search", search);
    }

    const response = await fetch(`${BASE_URL}/people/?${params}`,{next: {revalidate: 60}});
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    
    // Добавляем ID к каждому персонажу
    const charactersWithIds = data.results.map((character: Character) => ({
      ...character,
      id: extractIdFromUrl(character.url)
    }));

    return {
      ...data,
      results: charactersWithIds
    };
  },

  getCharacter: async (id: number): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/people/${id}/`,{next: {revalidate: 60}});
    if (!response.ok) {
      throw new Error("Failed to fetch character");
    }
    const character = await response.json();
    return {
      ...character,
      id: extractIdFromUrl(character.url)
    };
  },

  getPlanet: async (url: string): Promise<Planet> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch planet");
    }
    return response.json();
  }
};