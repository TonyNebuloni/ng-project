import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <h2>Mes Favoris</h2>
    <div *ngIf="favorites.length > 0; else noFavorites" class="favorites-grid">
      @for (favorite of favorites; track favorite.id) {
        <app-product-card
          [product]="favorite"
        ></app-product-card>
      }
    </div>
    <ng-template #noFavorites>
      <p>Vous n'avez aucun produit dans vos favoris pour le moment.</p>
    </ng-template>
  `,
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favorites: Product[] = [];
  constructor(private productService: ProductService) {
    this.loadFavorites(); 
  }

  loadFavorites() {
    this.favorites = this.productService.getFavoriteProducts(); 
  }
}
