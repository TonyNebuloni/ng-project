import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <div class="product-header">
        <h2>{{ product.name }}</h2>
        <p>Né(e) le: {{ product.createdDate | date: 'longDate':'UTC':'fr' }}</p>
      </div>
      <div class="product-actions">
        <button (click)="toggleFavorite()" [ngClass]="{'favorite': product.isFavorite}">
          {{ product.isFavorite ? '💔 Remove from Favorites' : '❤️ Add to Favorites' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() AddItemEvent = new EventEmitter<number>();

  constructor(private productService: ProductService) {}

  toggleFavorite() {
    const updatedStatus = this.productService.toggleFavorite(this.product.id);
    this.AddItemEvent.emit(updatedStatus ? 1 : -1);
  }
}
