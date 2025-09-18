import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Footer],
  template: `
    <app-header />
    <main class="h-[50vh]">Main</main>
    <app-footer />
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
