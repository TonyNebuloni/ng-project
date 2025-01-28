import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports: [CommonModule],
  template: `
    <div class="panier-container">
      <h2>Mon Panier</h2>

      <!-- Message si le panier est vide -->
      <div *ngIf="panierItems.length === 0">
        <p>Votre panier est vide.</p>
      </div>

      <!-- Liste des produits dans le panier -->
      <div *ngFor="let product of panierItems" class="panier-item">
        <img [src]="product.imageUrl" [alt]="product.name" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>Prix: {{ product.prix}}</p>
          <button (click)="remove(product.id)">Retirer du panier</button>
        </div>
      </div>

      <!-- Bouton pour vider tout le panier -->
      <button *ngIf="panierItems.length > 0" (click)="clearPanier()">
        Vider le panier
      </button>
    </div>
  `,

  styles: [``]
})
export class PanierComponent implements OnInit {

  panierItems: Product[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.loadPanier();
  }

  loadPanier(): void {
    this.panierItems = this.panierService.getPanierItems();
  }

  remove(productId: number): void {
    this.panierService.removeFromPanier(productId);
    this.loadPanier();
  }

  clearPanier(): void {
    this.panierService.clearPanier();
    this.loadPanier();
  }
}
