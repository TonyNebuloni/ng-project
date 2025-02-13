import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanierService, PanierItem } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="panier-container">
      <h1 class="panier-header">Votre Panier</h1>

      <div *ngIf="panierItems.length > 0; else emptyCart" class="panier-items">
        <div *ngFor="let item of panierItems" class="panier-item">
          <img [src]="item.pokemon.images.small" [alt]="item.pokemon.name" class="panier-item-image" />
          <div class="panier-item-info">
            <h3 class="panier-item-title">{{ item.pokemon.name }}</h3>
            <p class="panier-item-price">{{ item.pokemon.cardmarket?.prices?.averageSellPrice || 'N/A' }} €</p>
          </div>
          <div class="panier-item-quantity">
            <button class="quantity-button" (click)="removeOne(item.pokemon.id)">-</button>
            <span class="quantity-value">{{ item.quantity }}</span>
            <button class="quantity-button" (click)="addOne(item.pokemon)">+</button>
          </div>
          <button class="remove-button" (click)="removeProduct(item.pokemon.id)">Supprimer</button>
        </div>
      </div>

      <div class="panier-total" *ngIf="panierItems.length > 0">
        <h2>Total : {{ getTotalPrice() }} €</h2>
      </div>

      <button class="clear-panier" *ngIf="panierItems.length > 0" (click)="clearPanier()">Vider le panier</button>

      <ng-template #emptyCart>
        <p>Votre panier est vide.</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  panierItems: PanierItem[] = [];
  private panierService = inject(PanierService);

  ngOnInit(): void {
    this.refreshPanier();
  }

  addOne(pokemon: any): void {
    this.panierService.addToPanier(pokemon);
    this.refreshPanier();
  }

  removeOne(pokemonId: string): void {
    this.panierService.removeOneFromPanier(pokemonId);
    this.refreshPanier();
  }

  removeProduct(pokemonId: string): void {
    this.panierService.removeFromPanier(pokemonId);
    this.refreshPanier();
  }

  clearPanier(): void {
    this.panierService.clearPanier();
    this.refreshPanier();
  }

  private refreshPanier(): void {
    this.panierItems = this.panierService.getPanierItems();
  }

  getTotalPrice(): string {
    const total = this.panierItems.reduce((sum, item) => {
      return sum + ((item.pokemon.cardmarket?.prices?.averageSellPrice || 0) * item.quantity);
    }, 0);
    return total.toFixed(2);
  }
}