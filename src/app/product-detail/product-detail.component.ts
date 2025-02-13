import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Pokemon, PokemonService } from '../services/product.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div *ngIf="pokemon; else notFound" class="pokemon-detail">
      <div class="pokemon-image-container">
        <img [src]="pokemon.images.large" [alt]="pokemon.name" class="pokemon-image" />
      </div>
      <div class="pokemon-header">
        <h1>{{ pokemon.name }}</h1>
        <p>HP: {{ pokemon.hp }}</p>
        <p>Type: {{ pokemon.types.join(', ') }}</p>
        <p>Rareté: {{ pokemon.rarity }}</p>
        <p>Prix: {{ pokemon.cardmarket?.prices?.averageSellPrice || 'N/A' }} €</p>
        <p *ngIf="pokemon?.evolvesTo?.length">Évolue vers: <a [routerLink]="['/pokemon', pokemon.evolvesTo?.[0]]">{{ pokemon.evolvesTo?.[0] }}</a></p>
        
        <div class="pokemon-actions">
          <input type="number" id="quantity" [(ngModel)]="quantity" min="1" class="quantity-input" />
          <label for="quantity">Quantité</label>
          <button class="add-to-cart" (click)="onAddToPanier()">Ajouter au panier</button>
          <button class="back-button" (click)="goBack()">Retour à la liste</button>
        </div>
      </div>
    </div>

    <ng-template #notFound>
      <p>Pokémon introuvable ou ID invalide.</p>
      <button (click)="goBack()">Retour à la liste</button>
    </ng-template>
  `,
  styleUrls: ['./product-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  quantity = 1;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);
  private panierService = inject(PanierService);

  ngOnInit() {
    this.loadPokemon();
  }

  private loadPokemon() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID invalide:', id);
      this.handleInvalidPokemon();
      return;
    }

    this.pokemonService.getPokemonById(id)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération du Pokémon:', error);
          return of(null);
        })
      )
      .subscribe((fetchedPokemon) => {
        if (!fetchedPokemon) {
          console.error(`Pokémon avec l'ID ${id} introuvable.`);
          this.handleInvalidPokemon();
        } else {
          this.pokemon = fetchedPokemon;
        }
      });
  }



  private handleInvalidPokemon() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onAddToPanier() {
    if (this.pokemon && this.quantity > 0) {
      this.panierService.addToPanier(this.pokemon, this.quantity);
      alert(`${this.quantity} ${this.pokemon.name} ajouté(s) au panier.`);
    } else {
      alert('Veuillez sélectionner une quantité valide.');
    }
  }
}
