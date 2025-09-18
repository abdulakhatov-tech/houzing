import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { RouterModule } from '@angular/router';
import { SearchSection } from "./pages/home/search-section/search-section";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterModule, SearchSection],
  template: `
    <app-header />
    <app-search-section />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
