import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <footer>
  
  <nav>
    <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Retour à la liste des produits</a>
  </nav>
      <p>&copy; {{ currentYear }} Harry Potter Fan Site</p>
    </footer>
  `,
  styles: [
    `
      footer {
        background-color: #1a237e;
        color: white;
        margin: 0;
        padding: 1rem;
        text-align: center;
        position: relative;
        width: 100%;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
