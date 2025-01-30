import { Component, OnInit } from '@angular/core';
import { PanierService, PanierItem } from '../services/panier.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports:[CommonModule],
  template: `
    <div class="panier-container">
      <h1 class="panier-header">Votre Panier</h1>

      <!-- Affichage des produits si le panier contient des items -->
      <div *ngIf="panierItems.length > 0" class="panier-items">
        <div *ngFor="let item of panierItems" class="panier-item">
          <img 
            [src]="item.product.imageUrl" 
            [alt]="item.product.name" 
            class="panier-item-image" 
          />
          <div class="panier-item-info">
            <h3 class="panier-item-title">{{ item.product.name }}</h3>
            <p class="panier-item-price">
              {{ item.product.prix }}
            </p>
          </div>
          <div class="panier-item-quantity">
            <button 
              class="quantity-button" 
              (click)="removeOne(item.product.id)">-</button>
            <span class="quantity-value">{{ item.quantity }}</span>
            <button 
              class="quantity-button" 
              (click)="addOne(item.product)">+</button>
          </div>
          <button 
            class="remove-button" 
            (click)="removeProduct(item.product.id)">Supprimer</button>
        </div>
      </div>

      <!-- Affichage du prix total -->
      <div class="panier-total" *ngIf="panierItems.length > 0">
        <h2>Total : {{ getTotalPrice() }}</h2>
      </div>

      <!-- Bouton pour vider le panier -->
      <button 
        *ngIf="panierItems.length > 0" 
        class="clear-panier" 
        (click)="clearPanier()">Vider le panier</button>

      <!-- Message si le panier est vide -->
      <p *ngIf="panierItems.length === 0">Votre panier est vide.</p>
    </div>
  `,
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  panierItems: PanierItem[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.refreshPanier();
  }

  /**
   * Ajoute une unité d'un produit au panier.
   */
  addOne(product: Product): void {
    this.panierService.addToPanier(product);
    this.refreshPanier();
  }

  /**
   * Réduit la quantité d'un produit. Le retire s'il atteint 0.
   */
  removeOne(productId: number): void {
    this.panierService.removeOneFromPanier(productId);
    this.refreshPanier();
  }

  /**
   * Supprime complètement un produit du panier.
   */
  removeProduct(productId: number): void {
    this.panierService.removeFromPanier(productId);
    this.refreshPanier();
  }

  /**
   * Vide complètement le panier.
   */
  clearPanier(): void {
    this.panierService.clearPanier();
    this.refreshPanier();
  }

  /**
   * Rafraîchit la liste des produits dans le panier.
   */
  private refreshPanier(): void {
    this.panierItems = this.panierService.getPanierItems();
  }

  /**
   * Calcule le prix total du panier en fonction des quantités et prix.
   */
  getTotalPrice(): string {
    const total = this.panierItems.reduce((sum, item) => {
      return sum + item.product.prix * item.quantity;
    }, 0);

    return total.toFixed(2);
  }
}
