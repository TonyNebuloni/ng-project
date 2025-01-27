import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'ng-project';
  // countFav = 0;
  // selectedSortOption = 'nameAsc';
  // searchTerm = '';
  // ProductService = inject(ProductService);
  // products = this.ProductService.getProducts();

  // sortOptions = [
  //   { label: 'Name (A-Z)', value: 'nameAsc' },
  //   { label: 'Name (Z-A)', value: 'nameDesc' },
  //   { label: 'Date (Oldest First)', value: 'dateAsc' },
  //   { label: 'Date (Newest First)', value: 'dateDesc' }
  // ];

  // onAddItemEvent(event: number) {
  //   this.countFav += event;
  // }
}