import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [Header],
  template: ` <app-header />`,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
