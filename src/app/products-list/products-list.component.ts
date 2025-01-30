import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit
} from '@angular/core';
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
    <div class="hp-bg">
      <div class="separator"></div>
      <label for="search">Rechercher :</label>
      <input
        id="search"
        [(ngModel)]="searchTerm"
        placeholder="Ex: Harry Potter"
      />
      <button (click)="searchTerm = ''">x</button>

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
          <app-product-card [product]="p"></app-product-card>
        }
      </div>
    </div>
  `,
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
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

  constructor() {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((fetchedProducts) => {
      const favoriteIds = this.getFavorites();

      this.products = fetchedProducts.map((p) => ({
        ...p,
        isFavorite: favoriteIds.includes(p.id),
      }));

      this.updateFavoriteCount();
    });
  }

  // Met à jour le compteur de favoris
  updateFavoriteCount() {
    const favoriteProducts = this.products.filter((product) => product.isFavorite);
    this.countFav = favoriteProducts.length;
    this.countFavChange.emit(this.countFav);
  }

  // (Optionally) get the current list of favorite IDs from localStorage
  private getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(this.productService['FAVORITES_KEY']);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error);
      return [];
    }
  }

  // If you use this from child components to update the favorite count
  onAddItemEvent(event: number) {
    this.countFav += event;
    this.countFavChange.emit(this.countFav);
  }

  // Example navigation method
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
