import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../product';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root',
})


export class ProductService {
  private http = inject(HttpClient);
  private products = signal<Product[]>([]);
  readonly url = 'http://localhost:3000/products';
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap(products => this.products.set(products)),
    );
  }



  private FAVORITES_KEY = 'favorites';

  getProductById(id: number) {
    console.log('getProductById', id);
    return this.http.get<Product>(`${this.url}/${id}`).pipe(
      tap(product => { product.id = id; }),
    ); 
  }

  private getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(this.FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des favoris depuis localStorage:',
        error
      );
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

    // Retourne true si on vient d’ajouter l’élément en favoris
    return index === -1;
  }

  getFavoriteProducts(): Product[] {
    const favoriteIds = this.getFavorites();
    const productList = this.products();
    return productList.filter((product) => favoriteIds.includes(product.id));
  }
}
