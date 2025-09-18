import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `App`,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
