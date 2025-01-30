// product-detail.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import nécessaire pour ngModel
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajout de FormsModule
  template: `
    <div *ngIf="product; else notFound" class="product-detail" [ngClass]="product.maison.toLowerCase()">
      <div class="product-image-container">
        <img [src]="product.imageUrl" [alt]="product.name" class="product-image" />
      </div>
      <div class="product-header">
        <h1>{{ product.name }}</h1>
        <p class="product-house">Maison : <strong>{{ product.maison }}</strong></p>
        <p class="product-date">Prix: {{ product.prix }} €</p>

        <div class="product-actions">
          <input 
            type="number" 
            id="quantity" 
            [(ngModel)]="quantity" 
            min="1" 
            class="quantity-input"
          />
          <label for="quantity">Quantité </label>
          <button 
            class="hp-add-to-cart"
            (click)="onAddToPanier()"
          >
            Ajouter au panier
          </button>
          <button class="back-button" (click)="goBack()" style="margin: 0;">Retour à la liste</button>
        </div>
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
  quantity: number = 1; // Propriété pour la quantité

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private panierService = inject(PanierService); // Injection du PanierService

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

  onAddToPanier() {
    if (this.product && this.quantity > 0) {
      this.panierService.addToPanier(this.product, this.quantity);
      // Optionnel : Afficher un message de confirmation ou rediriger
      alert(`${this.quantity} ${this.product.name} ajouté(s) au panier.`);
    } else {
      alert('Veuillez sélectionner une quantité valide.');
    }
  }
}
