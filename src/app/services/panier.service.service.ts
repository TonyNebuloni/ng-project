import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly PANIER_KEY = 'panierItems';

  constructor() {}


  getPanierItems(): Product[] {
    try {
      const storedData = localStorage.getItem(this.PANIER_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      return [];
    }
  }


  addToPanier(product: Product): void {
    const panier = this.getPanierItems();
    panier.push(product);
    localStorage.setItem(this.PANIER_KEY, JSON.stringify(panier));
  }


  removeFromPanier(productId: number): void {
    let panier = this.getPanierItems();
    panier = panier.filter((item) => item.id !== productId);
    localStorage.setItem(this.PANIER_KEY, JSON.stringify(panier));
  }


  clearPanier(): void {
    localStorage.removeItem(this.PANIER_KEY);
  }
}
