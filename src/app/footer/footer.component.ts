import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p>&copy; {{ currentYear }} Harry Potter Fan Site</p>
    </footer>
  `,
  styles: [
    `
      footer {
        background-color: #1a237e;
        color: white;
        padding: 1rem;
        text-align: center;
        position: fixed;
        width: 100%;
        bottom: 0;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
