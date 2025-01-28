import { Injectable } from '@angular/core';
import { Product } from '../product';

export interface PanierItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly PANIER_KEY = 'panierItems';

  constructor() {}

  /**
   * Récupérer les items du panier depuis localStorage.
   */
  getPanierItems(): PanierItem[] {
    try {
      const storedData = localStorage.getItem(this.PANIER_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération du panier :', error);
      return [];
    }
  }

  /**
   * Ajouter un produit au panier ou augmenter la quantité si déjà présent.
   * @param product Produit à ajouter
   */
  addToPanier(product: Product): void {
    if (!product || !product.id) {
      console.error('Produit invalide ou sans ID :', product);
      return;
    }

    const panier = this.getPanierItems();

    // Vérifie si le produit existe déjà dans le panier
    const existingItem = panier.find(item => item.product.id === product.id);

    if (existingItem) {
      // Augmente la quantité si le produit existe déjà
      existingItem.quantity += 1;
    } else {
      // Ajoute un nouveau produit avec une quantité initiale de 1
      panier.push({ product, quantity: 1 });
    }

    this.savePanier(panier);
  }

  /**
   * Réduire la quantité d'un produit ou le retirer si la quantité atteint 0.
   * @param productId ID du produit
   */
  removeOneFromPanier(productId: number): void {
    if (!productId) {
      console.error('ID de produit invalide :', productId);
      return;
    }

    const panier = this.getPanierItems();

    const existingItem = panier.find(item => item.product.id === productId);

    if (existingItem) {
      // Réduit la quantité
      existingItem.quantity -= 1;

      // Supprime complètement l'élément si la quantité est <= 0
      if (existingItem.quantity <= 0) {
        this.removeFromPanier(productId);
        return;
      }
    }

    this.savePanier(panier);
  }

  /**
   * Supprimer complètement un produit du panier.
   * @param productId ID du produit
   */
  removeFromPanier(productId: number): void {
    if (!productId) {
      console.error('ID de produit invalide :', productId);
      return;
    }

    const panier = this.getPanierItems().filter(
      item => item.product.id !== productId
    );

    this.savePanier(panier);
  }

  /**
   * Vider tout le panier.
   */
  clearPanier(): void {
    localStorage.removeItem(this.PANIER_KEY);
  }

  /**
   * Sauvegarder le panier dans localStorage.
   * @param panier Liste des items à sauvegarder
   */
  private savePanier(panier: PanierItem[]): void {
    try {
      localStorage.setItem(this.PANIER_KEY, JSON.stringify(panier));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier :', error);
    }
  }
}
