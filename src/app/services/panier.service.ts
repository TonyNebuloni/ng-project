import { Injectable } from '@angular/core';
import { Pokemon } from '../services/product.service';

export interface PanierItem {
  pokemon: Pokemon;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly PANIER_KEY = 'panierItems';

  constructor() {}

  getPanierItems(): PanierItem[] {
    try {
      const storedData = localStorage.getItem(this.PANIER_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération du panier :', error);
      return [];
    }
  }

  addToPanier(pokemon: Pokemon, quantity: number = 1): void {
    if (!pokemon || !pokemon.id) {
      console.error('Pokémon invalide ou sans ID :', pokemon);
      return;
    }

    const panier = this.getPanierItems();
    const existingItem = panier.find(item => item.pokemon.id === pokemon.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      panier.push({ pokemon, quantity });
    }

    this.savePanier(panier);
  }

  removeOneFromPanier(pokemonId: string): void {
    if (!pokemonId) {
      console.error('ID de Pokémon invalide :', pokemonId);
      return;
    }

    const panier = this.getPanierItems();
    const existingItem = panier.find(item => item.pokemon.id === pokemonId);

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity <= 0) {
        this.removeFromPanier(pokemonId);
        return;
      }
    }
    this.savePanier(panier);
  }

  removeFromPanier(pokemonId: string): void {
    if (!pokemonId) {
      console.error('ID de Pokémon invalide :', pokemonId);
      return;
    }

    const panier = this.getPanierItems().filter(item => item.pokemon.id !== pokemonId);
    this.savePanier(panier);
  }

  clearPanier(): void {
    localStorage.removeItem(this.PANIER_KEY);
  }

  private savePanier(panier: PanierItem[]): void {
    try {
      localStorage.setItem(this.PANIER_KEY, JSON.stringify(panier));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier :', error);
    }
  }
}
