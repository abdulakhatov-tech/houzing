import { Component } from '@angular/core';

import { HeroSection } from './hero-section/hero-section';
import { BannerSection } from "./banner-section/banner-section";
import { ChooseUsSection } from "./choose-us-section/choose-us-section";

@Component({
  selector: 'app-home',
  imports: [HeroSection, ChooseUsSection, BannerSection],
  template: `
    <app-hero-section />
    <app-choose-us-section />
    <app-banner-section />
  `,
  styleUrl: './home.css',
})
export class Home {}
