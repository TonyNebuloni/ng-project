import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 0, name: 'Harry Potter', isFavorite: false, createdDate: new Date(1980, 6, 31), taille: 1.85 },
    { id: 1, name: 'Ronnald Weasley', isFavorite: false, createdDate: new Date(1980, 3, 1), taille: 1.85 },
    { id: 2, name: 'Hermione Granger', isFavorite: false, createdDate: new Date(1979, 8, 19), taille: 1.65 },
    { id: 3, name: 'Neville Londubas', isFavorite: false, createdDate: new Date(1980, 7, 30), taille: 1.85 },
    { id: 4, name: 'Albus Dumbledore', isFavorite: false, createdDate: new Date(1881, 7, 30), taille: 1.85 },
    { id: 5, name: 'Severus Snape', isFavorite: false, createdDate: new Date(1960, 1, 9), taille: 1.85 },
    { id: 6, name: 'Draco Malfoy', isFavorite: false, createdDate: new Date(1980, 5, 5), taille: 1.85 },
    { id: 7, name: 'Luna Lovegood', isFavorite: false, createdDate: new Date(1981, 2, 13), taille: 1.68 },
    { id: 8, name: 'Ginny Weasley', isFavorite: false, createdDate: new Date(1981, 7, 11), taille: 1.75 },
    { id: 9, name: 'Fred Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1), taille: 1.85 },
    { id: 10, name: 'George Weasley', isFavorite: false, createdDate: new Date(1978, 3, 1), taille: 1.85 },
    { id: 11, name: 'Minerva McGonagall', isFavorite: false, createdDate: new Date(1935, 9, 4), taille: 1.78 },
    { id: 12, name: 'Hagrid', isFavorite: false, createdDate: new Date(1928, 11, 6), taille: 4.85 },
    { id: 13, name: 'Sirius Black', isFavorite: false, createdDate: new Date(1960, 10, 11), taille: 1.85 },
    { id: 14, name: 'Remus Lupin', isFavorite: false, createdDate: new Date(1960, 2, 10), taille: 1.88 },
  ];

  private FAVORITES_KEY = 'favorites'; 

  getProducts(): Product[] {
    const favoriteIds = this.getFavorites(); 
    return this.products.map((product) => ({
      ...product,
      isFavorite: favoriteIds.includes(product.id),
    }));
  }

  getProductById(id: number): Product | null {
    const favoriteIds = this.getFavorites();
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.warn(`Produit avec l'ID ${id} introuvable.`);
      return null;
    }
    return { ...product, isFavorite: favoriteIds.includes(product.id) };
  }

  private getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(this.FAVORITES_KEY);
      console.log( favorites);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris depuis localStorage:', error);
      return [];
    }
  }

  toggleFavorite(id: number): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(id);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }

    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));

    return index === -1;
  }

  getFavoriteProducts(): Product[] {
    const favoriteIds = this.getFavorites();
    return this.products.filter((product) => favoriteIds.includes(product.id));
  }
}
