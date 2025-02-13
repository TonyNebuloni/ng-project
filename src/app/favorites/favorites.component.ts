import { Component, OnInit, inject } from '@angular/core';
import { Pokemon, PokemonService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  template: `
    <h2>Mes Favoris</h2>
    <div *ngIf="favorites.length > 0; else noFavorites" class="favorites-grid">
      @for (favorite of favorites; track favorite.id) {
        <app-pokemon-card [pokemon]="favorite"></app-pokemon-card>
      }
    </div>
    <ng-template #noFavorites>
      <p>Vous n'avez aucun Pokémon dans vos favoris pour le moment.</p>
    </ng-template>
  `,
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: Pokemon[] = [];
  private pokemonService = inject(PokemonService);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favoriteIds = this.pokemonService.getFavorites();
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.favorites = pokemons.filter(p => favoriteIds.includes(p.id));
    });
  }
}