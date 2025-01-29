import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- product-card.component.html -->
<div 
  class="hp-card" 
  [ngClass]="product.maison.toLowerCase()" 
>
  <div class="hp-card-content">
    <button 
      class="hp-favorite-button"
      (click)="toggleFavorite()"
      [ngClass]="{ 'favorite': product.isFavorite }"
    >
      {{ product.isFavorite ? '★' : '☆' }}
    </button>

    <img
      class="hp-wizard-image"
      [src]="product.imageUrl"
      [alt]="product.name"
      (click)="navigateToDetail(product.id)"
    />

    <div class="hp-card-header">
      <h2 class="hp-wizard-name">Baguette de : {{ product.name }}</h2>
      <p class="hp-wizard-maison">Maison : {{ product.maison }}</p>
      <p class="hp-wizard-price">Prix : {{ product.prix }} €</p>
    </div>

    <button 
      class="hp-add-to-cart"
      (click)="onAddToPanier()"
    >
      Ajouter au panier
    </button>
  </div>
</div>

  `,
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  /**
   * Événement émis quand on clique sur "Favori" 
   * (ici on émet +1 ou -1 par exemple)
   */
  @Output() favoriteChanged = new EventEmitter<number>();

  /**
   * Événement émis quand on clique sur "Ajouter au panier".
   * On enverra carrément le `Product` au parent.
   */
  @Output() addToPanierEvent = new EventEmitter<Product>();

  private productService = inject(ProductService);
  private router = inject(Router);
  private panierService = inject(PanierService);
  /**
   * Naviguer vers la page de détail d'un produit
   */
  navigateToDetail(productId: number) {
    this.router.navigate(['/', productId]);
  }

  /**
   * Ajout / Retrait des favoris
   */
  toggleFavorite() {
    const updatedStatus = this.productService.toggleFavorite(this.product.id);
    this.product.isFavorite = updatedStatus;
    // On émet +1 ou -1 pour signaler le changement au parent (optionnel)
    this.favoriteChanged.emit(updatedStatus ? 1 : -1);
  }

  onAddToPanier() {
    this.panierService.addToPanier(this.product);
    this.addToPanierEvent.emit(this.product);
  }

}
