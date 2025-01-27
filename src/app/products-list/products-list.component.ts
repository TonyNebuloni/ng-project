import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SortByDatePipe } from '../pipes/sort-by-date.pipe';
import { SortByNamePipe } from '../pipes/sort-by-name.pipe';
import { SearchByNamePipe } from '../pipes/searchbyname.pipe';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    FormsModule,
    SortByDatePipe,
    SortByNamePipe,
    SearchByNamePipe,
    ProductCardComponent,
  ],
  template: `
    <h2>Favoris : {{ countFav }}</h2>

    <label for="search">Rechercher :</label>
    <input id="search" [(ngModel)]="searchTerm" />
    <button (click)="searchTerm = ''">Vider la recherche</button>

    <label for="sortOptions">Trier par :</label>
    <select id="sortOptions" [(ngModel)]="selectedSortOption">
      @for (option of sortOptions; track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>

    <div class="product-grid">
      @for (
        p of products
        | searchByName: searchTerm
        | sortByName: (selectedSortOption === 'nameAsc') || (selectedSortOption === 'nameDesc' && false)
        | sortByDate: (selectedSortOption === 'dateAsc') || (selectedSortOption === 'dateDesc' && false);
        track p.id
      ) {
        <app-product-card
          [product]="p"
          (AddItemEvent)="onAddItemEvent($event)"
        ></app-product-card>
      }
    </div>
  `,
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  @Input() countFav = 0; 
  @Output() countFavChange = new EventEmitter<number>();

  selectedSortOption = 'nameAsc'; 
  searchTerm = '';
  products: any[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);

  sortOptions = [
    { label: 'Name (A-Z)', value: 'nameAsc' },
    { label: 'Name (Z-A)', value: 'nameDesc' },
    { label: 'Date (Oldest First)', value: 'dateAsc' },
    { label: 'Date (Newest First)', value: 'dateDesc' },
  ];

  constructor() {
    this.products = this.productService.getProducts();
    this.updateFavoriteCount();
  }

  // Met à jour le compteur de favoris
  updateFavoriteCount() {
    const favoriteProducts = this.products.filter((product) => product.isFavorite);
    this.countFav = favoriteProducts.length;
    this.countFavChange.emit(this.countFav);
  }

  // Gestion des favoris
  onAddItemEvent(event: number) {
    this.countFav += event;
    this.countFavChange.emit(this.countFav); 
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
