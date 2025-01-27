import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>Harry Potter Characters</h1>
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
