import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hp-card">
      <div class="hp-card-header">
        <img 
          class="hp-wizard-image" 
          [src]="product.imageUrl" 
          [alt]="product.name"
        />
        <h2 class="hp-wizard-name">{{ product.name }}</h2>
        <p class="hp-created-date">
          Né(e) le : {{ product.createdDate | date: 'longDate':'UTC':'fr' }}
        </p>
      </div>

      <div class="hp-card-footer">
        <!-- Bouton Favori -->
        <button 
          class="hp-favorite-button" 
          (click)="toggleFavorite()" 
          [ngClass]="{ 'favorite': product.isFavorite }"
        >
          {{ product.isFavorite ? '★' : '☆' }}
        </button>

        <!-- Bouton pour ajouter au panier -->
        <button (click)="onAddToPanier()">
          Ajouter au panier
        </button>

        <!-- Bouton pour voir le détail -->
        <button 
          class="hp-detail-button" 
          (click)="navigateToDetail(product.id)"
        >
          Voir les détails
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

  /**
   * Émet l'événement vers le parent pour ajouter au panier
   */
  onAddToPanier() {
    this.addToPanierEvent.emit(this.product);
  }
}
