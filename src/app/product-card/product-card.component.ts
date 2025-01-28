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
    <button 
      class="hp-favorite-button" 
      (click)="toggleFavorite()" 
      [ngClass]="{ 'favorite': product.isFavorite }"
    >
      {{ product.isFavorite ? '★' : '☆' }}
    </button>

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
