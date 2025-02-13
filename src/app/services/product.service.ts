import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export interface Pokemon {
  isFavorite?: boolean;
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesTo?: string[];
  attacks?: { name: string; cost: string[]; convertedEnergyCost: number; damage: string; text: string }[];
  weaknesses?: { type: string; value: string }[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: { unlimited: string };
    releaseDate: string;
    updatedAt: string;
    images: { symbol: string; logo: string };
  };
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers: number[];
  legalities: { unlimited: string };
  images: { small: string; large: string };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices?: { normal: { low: number; mid: number; high: number; market: number; directLow: number | null } };
  };
  cardmarket?: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      reverseHoloTrend: number;
      lowPriceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private pokemons = signal<Pokemon[]>([]);
  private readonly API_URL = 'https://api.pokemontcg.io/v2/cards';
  private readonly FAVORITES_KEY = 'favoritePokemons';

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ data: Pokemon[] }>(`${this.API_URL}?q=nationalPokedexNumbers:[1 TO 151]&orderBy=nationalPokedexNumbers&pageSize=151`, {headers:{"X-Api-Key":"629453d6-b027-437d-b229-de935b6b2f73"  }}).pipe(
      map(response => response.data),
      tap(data => this.pokemons.set(data)),
    );
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<{ data: Pokemon }>(`${this.API_URL}/${id}`).pipe(
      map(response => response.data),
    );
  }

  /**
   * Récupère la liste des IDs des Pokémon favoris depuis localStorage
   */
  getFavorites(): string[] {
    try {
      const favorites = localStorage.getItem(this.FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error);
      return [];
    }
  }

  /**
   * Ajoute ou supprime un Pokémon des favoris
   * @param id ID du Pokémon
   * @returns True si ajouté, False si supprimé
   */
  toggleFavorite(id: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(id);

    if (index > -1) {
      // Supprime des favoris
      favorites.splice(index, 1);
    } else {
      // Ajoute aux favoris
      favorites.push(id);
    }

    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));

    return index === -1;
  }
}
