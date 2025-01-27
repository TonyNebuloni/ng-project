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
    <div class="product-card">
      <div class="product-header">
        <h2>{{ product.name }}</h2>
        <p>Né(e) le : {{ product.createdDate | date: 'longDate':'UTC':'fr' }}</p>
      </div>
      <div class="product-actions">
        <button (click)="toggleFavorite()" [ngClass]="{ 'favorite': product.isFavorite }">
          {{ product.isFavorite ? '💔 Retirer des Favoris' : '❤️ Ajouter aux Favoris' }}
        </button>
      </div>
      
      <button (click)="navigateToDetail(product.id)">Voir les détails</button>
    </div>
  `,
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product; 
  @Output() AddItemEvent = new EventEmitter<number>(); 

  private productService = inject(ProductService);
  private router = inject(Router);

  navigateToDetail(productId: number) {
    this.router.navigate(['/', productId]);
  }

  toggleFavorite() {
    const updatedStatus = this.productService.toggleFavorite(this.product.id);
    this.product.isFavorite = updatedStatus; 
    this.AddItemEvent.emit(updatedStatus ? 1 : -1); 
  }
}
