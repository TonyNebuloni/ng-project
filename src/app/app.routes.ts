import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent
    },
      {
        path: 'favorites',
        component: FavoritesComponent
    },
    {
        path: ':id',
        component: ProductDetailComponent
    },
  

];
