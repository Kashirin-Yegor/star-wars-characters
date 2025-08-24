import {makeAutoObservable} from "mobx";
import {ApiResponse, Character} from "@/shared/types/character";
import {charactersApi} from "@/services/api";
import {LOCAL_STORAGE_KEY} from "@/shared/constants";

export class HomeStore {
    loading = true;
    isCardView = true;
    error:null | string = null;
    totalPages:number = 1;
    currentPage:number = 1;
    characters: Character[] = [];
    searchQuery = "";

    constructor() {
        makeAutoObservable(this);
        this.fetchCharacters();
    }

    private setLoading(value: boolean) {
        this.loading = value;
    }

    private setIsCardView(value: boolean) {
        this.isCardView = value;
    }

    private setError(value: string | null) {
        this.error = value;
    }

    private setCharacters(value: Character[]) {
        this.characters = value;
    }

    private setTotalPages(value: number) {
        this.totalPages = value;
    }

    private setSearchQuery(value: string) {
        this.searchQuery = value;
    }

    private setCurrentPage(value: number) {
        this.currentPage = value;
    }

    private prepareCharacters (originalData:Character[]): Character[] {
        try{
            if (typeof window === 'undefined') {
                return originalData;
            }
            
            const cache = localStorage.getItem(LOCAL_STORAGE_KEY);
            const cacheData = cache ? JSON.parse(cache) : {};
            return originalData.map((el) => {
                const find_cache = cacheData[el.name] ?? {};
                return {...el,...find_cache};
            });
        }catch(e){
            console.log(e);
            return originalData;
        }
    }

    public async fetchCharacters() {
        try {
            this.setLoading(true);
            this.setError(null);
            const data: ApiResponse = await charactersApi.getCharacters(this.currentPage, this.searchQuery);
            this.setCharacters(this.prepareCharacters(data.results));
            this.setTotalPages(Math.ceil(data.count / 10));
        } catch{
            this.setError("Не удалось загрузить персонажей");
            this.setCharacters([]);
        } finally {
            this.setLoading(false);
        }
    }

    public handleSearch(query: string)  {
        this.setSearchQuery(query);
        this.setCurrentPage(1);
        this.fetchCharacters();
    };

    public handlePageChange(page: number)  {
        this.setCurrentPage(page);
        this.fetchCharacters();
    };
    public handleChangeCardView(value:boolean){
        this.setIsCardView(value);
    }
}