import { Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection],
  template: `<app-hero-section /> `,
  styleUrl: './home.css',
})
export class Home {}
