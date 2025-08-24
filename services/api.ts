import { ApiResponse, Character, Planet } from "@/shared/types/character";
import {extractIdFromUrl} from "@/shared/utils"
import {BASE_URL,CACHE_REVALIDATE_TIME,LONG_CACHE_TIME} from "@/shared/constants"

export const charactersApi = {
  getCharacters: async (page = 1, search = ""): Promise<ApiResponse> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (search) {
      params.append("search", search);
    }

    const cacheTime = search ? CACHE_REVALIDATE_TIME : LONG_CACHE_TIME;
    
    const response = await fetch(`${BASE_URL}/people/?${params}`, {
      next: { 
        revalidate: cacheTime,
        tags: ['characters']
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
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
    const response = await fetch(`${BASE_URL}/people/${id}/`, {
      next: { 
        revalidate: LONG_CACHE_TIME,
        tags: [`character-${id}`]
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch character: ${response.status} ${response.statusText}`);
    }
    
    const character = await response.json();
    return {
      ...character,
      id: extractIdFromUrl(character.url)
    };
  },

  getPlanet: async (url: string): Promise<Planet> => {
    const response = await fetch(url, {
      next: { 
        revalidate: LONG_CACHE_TIME,
        tags: ['planets']
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch planet: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
};