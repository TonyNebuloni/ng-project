import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
<header>
  <div class="header-container">
  <div class="favorites">
      <a routerLink='/favorites' routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Favoris</a>
    </div>
    <div class="decorative-line"></div>
    
    <div class="logo">
      <a routerLink='/' routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">
      <img src="/assets/images/logo2.png" alt="Logo" >
</a>
    </div>
    
    <div class="decorative-line"></div>

    <div class="favorites">
      <a routerLink='/panier' routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Panier</a>
    </div>
  </div>
</header>

  `,
  styles: [
    `
header {
  background-color: rgb(3,3,3); /* Bleu nuit comme l'image */
  padding: 15px 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.logo img {
  height: 50px;
}

.favorites a {
  color: #C49D52; /* Or */
  text-decoration: none;
  font-size: 18px;
  font-family: 'Cormorant Unicase', serif;
}

.favorites a:hover {
  text-decoration: underline;
}

/* Barre décorative avec un carré */
.decorative-line {
  flex-grow: 1;
  height: 2px;
  background-color: #C49D52;
  position: relative;
  margin: 0 15px;
}

.decorative-line::before,
.decorative-line::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #C49D52;
  top: 50%;
  transform: translateY(-50%);
}

.decorative-line::before {
  left: 0;
}

.decorative-line::after {
  right: 0;
}


    `,
  ],
})
export class HeaderComponent {}
