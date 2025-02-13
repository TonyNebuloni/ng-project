import { Component, OnInit, inject } from '@angular/core';
import { PokemonService, Pokemon } from '../services/product.service';
import { PanierService } from '../services/panier.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="pokemon-bg">
      <div class="separator"></div>
      <label for="search">Rechercher :</label>
      <input
        id="search"
        [(ngModel)]="searchTerm"
        placeholder="Ex: Bulbasaur"
      />
      <button (click)="searchTerm = ''">x</button>

      <label for="sortOptions">Trier par :</label>
      <select id="sortOptions" [(ngModel)]="selectedSortOption">
        <option value="nameAsc">Nom (A-Z)</option>
        <option value="nameDesc">Nom (Z-A)</option>
        <option value="hpAsc">HP (Croissant)</option>
        <option value="hpDesc">HP (Décroissant)</option>
      </select>

      <div class="pokemon-grid">
        <div *ngFor="let p of filteredPokemons()" class="pokemon-card">
          <a [routerLink]="['/', p.id]">
            <img [src]="p.images.small" [alt]="p.name" />
            <h3>{{ p.name }}</h3>
          </a>
          <div class="pokemon-actions">
            <button (click)="toggleFavorite(p, $event)">
              {{ isFavorite(p.id) ? '★' : '☆' }}
            </button>
            <button (click)="addToPanier(p, $event)">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./products-list.component.css']
})
export class PokemonListComponent implements OnInit {
  searchTerm = '';
  selectedSortOption = 'nameAsc';
  pokemons: Pokemon[] = [];
  favoriteIds: string[] = [];

  private pokemonService = inject(PokemonService);
  private panierService = inject(PanierService);
  private router = inject(Router);

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((fetchedPokemons) => {
      this.favoriteIds = this.pokemonService.getFavorites();
      this.pokemons = fetchedPokemons;
    });
  }

  filteredPokemons(): Pokemon[] {
    return this.pokemons
      .filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => this.sortKey(a, b));
  }

  private sortKey(a: Pokemon, b: Pokemon): number {
    if (this.selectedSortOption === 'nameAsc') return a.name.localeCompare(b.name);
    if (this.selectedSortOption === 'nameDesc') return b.name.localeCompare(a.name);
    if (this.selectedSortOption === 'hpAsc') return parseInt(a.hp || '0') - parseInt(b.hp || '0');
    if (this.selectedSortOption === 'hpDesc') return parseInt(b.hp || '0') - parseInt(a.hp || '0');
    return 0;
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds.includes(id);
  }

  toggleFavorite(pokemon: Pokemon, event: Event): void {
    event.stopPropagation();
    const newStatus = this.pokemonService.toggleFavorite(pokemon.id);
    if (newStatus) {
      this.favoriteIds.push(pokemon.id);
    } else {
      this.favoriteIds = this.favoriteIds.filter(favId => favId !== pokemon.id);
    }
  }

  addToPanier(pokemon: Pokemon, event: Event): void {
    event.stopPropagation();
    this.panierService.addToPanier(pokemon);
  }
}
