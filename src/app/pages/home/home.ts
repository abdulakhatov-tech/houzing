import { Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { ChooseUsSection } from "./choose-us-section/choose-us-section";

@Component({
  selector: 'app-home',
  imports: [HeroSection, ChooseUsSection],
  template: `
    <app-hero-section />
    <app-choose-us-section />
  `,
  styleUrl: './home.css',
})
export class Home {}
