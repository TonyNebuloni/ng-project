import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PanierComponent } from './panier/panier.component';

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
        path: 'panier',
        component: PanierComponent
    },
    {
        path: ':id',
        component: ProductDetailComponent
    },
  

];
