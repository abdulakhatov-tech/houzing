import { Component } from '@angular/core';

import { HeroSection } from './hero-section/hero-section';
import { BannerSection } from "./banner-section/banner-section";
import { ChooseUsSection } from "./choose-us-section/choose-us-section";
import { TestimonialsSection } from './testimonials-section/testimonials-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, ChooseUsSection, BannerSection, TestimonialsSection],
  template: `
    <app-hero-section />
    <app-choose-us-section />
    <app-banner-section />
    <app-testimonials-section />
  `,
})
export class Home {}
