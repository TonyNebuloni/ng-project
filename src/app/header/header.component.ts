import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1 > <a routerLink=''>Harry Potter Characters</a></h1>
      <a routerLink='/favorites' routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Mes Favoris</a>

    </header>
  `,
  styles: [
    `
      header {
        background-color: #1a237e;
        color: white;
        padding: 1rem;
        text-align: center;
      }
    `,
  ],
})
export class HeaderComponent {}
