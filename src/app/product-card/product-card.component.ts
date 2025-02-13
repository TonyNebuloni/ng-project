import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Pokemon, PokemonService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokemon-card">

      <img
        class="pokemon-image"
        [src]="pokemon.images.small"
        [alt]="pokemon.name"
        (click)="navigateToDetail(pokemon.id)"
      />

      <div class="pokemon-card-info">
        <h2>{{ pokemon.name }}</h2>
        <p>Type : {{ pokemon.types.join(', ') }}</p>
        <p>HP : {{ pokemon.hp }}</p>
        <p>Rareté : {{ pokemon.rarity }}</p>
        <p>Prix : {{ pokemon.cardmarket?.prices?.averageSellPrice ?? 'N/A' }} €</p>
      </div>

      <button 
        class="add-to-cart"
        (click)="onAddToPanier()"
      >
        Ajouter au panier
      </button>
    </div>
  `,
  styleUrls: ['./product-card.component.css'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() favoriteChanged = new EventEmitter<number>();
  @Output() addToPanierEvent = new EventEmitter<Pokemon>();

  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  private panierService = inject(PanierService);

  navigateToDetail(pokemonId: string) {
    this.router.navigate(['/pokemon', pokemonId]);
  }

  onAddToPanier() {
    this.panierService.addToPanier(this.pokemon);
    this.addToPanierEvent.emit(this.pokemon);
  }
}
