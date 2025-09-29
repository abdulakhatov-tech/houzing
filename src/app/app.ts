import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, computed, signal } from '@angular/core';

import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { SearchSection } from './pages/home/search-section/search-section';
import { ZardToastComponent } from '@shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterModule, SearchSection, CommonModule, ZardToastComponent],
  template: `
    <app-header />

    <!-- 🔥 only show on home or /properties -->
    <app-search-section *ngIf="showSearch()" />

    <main>
      <router-outlet />
    </main>

    <z-toaster />
    <app-footer />
  `,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
  protected readonly currentUrl = signal<string>('');

  // ✅ computed signal to decide when to show search
  readonly showSearch = computed(
    () => this.currentUrl().startsWith('/properties') || this.currentUrl() === '/'
  );

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url.split('?')[0]);
    });
  }
}
