import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="product; else notFound" class="product-detail">
      <div class="product-header">
        <h1>{{ product.name }}</h1>
        <p>Né(e) le : {{ product.createdDate | date: 'longDate':'UTC':'fr' }}</p>
      </div>

      <div class="product-body">
        <p><strong>Favori :</strong> {{ product.isFavorite ? 'Oui' : 'Non' }}</p>
        <p><strong>Taille :</strong> {{ product.taille }}</p>
      </div>

      <div class="product-actions">
        <button (click)="toggleFavorite()" [ngClass]="{'favorite': product.isFavorite}">
          {{ product.isFavorite ? '💔 Retirer des Favoris' : '❤️ Ajouter aux Favoris' }}
        </button>
      </div>
    </div>

    <ng-template #notFound>
      <p>Produit introuvable ou ID invalide.</p>
      <button (click)="goBack()">Retour à la liste</button>
    </ng-template>
  `,
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: Product | null = null;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  constructor() {
    this.loadProduct();
  }

  // Charge le produit à partir de l'ID de l'URL
  private loadProduct() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (isNaN(id)) {
      console.error(`ID invalide : ${idParam}`);
      this.handleInvalidProduct();
      return;
    }

    this.product = this.productService.getProductById(id);

    if (!this.product) {
      console.error(`Produit avec l'ID ${id} introuvable.`);
      this.handleInvalidProduct();
    }
  }

  toggleFavorite() {
    if (this.product) {
      const newFavoriteStatus = this.productService.toggleFavorite(this.product.id);
      this.product.isFavorite = newFavoriteStatus; 
    }
  }

  private handleInvalidProduct() {
    setTimeout(() => {
      this.router.navigate(['/']); 
    }, 500);
  }

  goBack() {
    this.router.navigate(['/']); 
  }
}
