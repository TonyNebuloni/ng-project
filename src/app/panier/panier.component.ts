import { Component, OnInit } from '@angular/core';
import { PanierService, PanierItem } from '../services/panier.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import nécessaire pour ngModel

@Component({
  selector: 'app-panier',
  imports: [CommonModule, FormsModule], // Ajout de FormsModule
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
              {{ item.product.prix }} €
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
        <h2>Total : {{ getTotalPrice() }} €</h2>
      </div>

      <!-- Formulaire de commande -->
      <div *ngIf="panierItems.length > 0" class="commande-form">
        <h2>Passer la Commande</h2>
        <form (ngSubmit)="submitOrder()" #orderForm="ngForm">
          <div class="form-group">
            <label for="name">Nom :</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              [(ngModel)]="order.name" 
              required 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="address">Adresse :</label>
            <textarea 
              id="address" 
              name="address" 
              [(ngModel)]="order.address" 
              required 
              class="form-textarea"
            ></textarea>
          </div>
          <button type="submit" class="commander-button" [disabled]="!orderForm.form.valid">Commander</button>
        </form>
      </div>

      <!-- Bouton pour vider le panier -->
      <button 
        *ngIf="panierItems.length > 0" 
        class="clear-panier" 
        (click)="clearPanier()">Vider le panier</button>

      <!-- Message si le panier est vide -->
      <p *ngIf="panierItems.length === 0">Votre panier est vide.</p>

      <!-- Popup de succès -->
      <div class="success-popup" *ngIf="showSuccessPopup">
        <div class="popup-content">
          <h2>Commande Réussie !</h2>
          <p>Merci {{ order.name }} pour votre commande.</p>
          <button (click)="closePopup()" class="close-popup">Fermer</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  panierItems: PanierItem[] = [];
  order = {
    name: '',
    address: ''
  };
  showSuccessPopup: boolean = false;

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

    return total.toFixed(2); // Arrondir à 2 chiffres après la virgule
  }

  /**
   * Soumet la commande et affiche la popup de succès.
   */
  submitOrder(): void {
    // Vous pouvez ajouter ici une logique pour traiter la commande (ex: envoyer au backend)
    this.showSuccessPopup = true;
    this.clearPanier();
  }

  /**
   * Ferme la popup de succès.
   */
  closePopup(): void {
    this.showSuccessPopup = false;
  }
}
