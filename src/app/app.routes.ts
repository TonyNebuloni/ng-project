import { Routes } from '@angular/router';
import { PokemonListComponent } from './products-list/products-list.component';
import { PokemonDetailComponent } from './product-detail/product-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PanierComponent } from './panier/panier.component';

export const routes: Routes = [
    {
        path: '',
        component: PokemonListComponent
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
        component: PokemonDetailComponent
    },
  

];
