import { Component } from '@angular/core';

import { HeroSection } from './hero-section/hero-section';
import { BannerSection } from './banner-section/banner-section';
import { ChooseUsSection } from './choose-us-section/choose-us-section';
import { CategoriesSection } from './categories-section/categories-section';
import { RecommendedSection } from './recommended-section/recommended-section';
import { TestimonialsSection } from './testimonials-section/testimonials-section';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    BannerSection,
    ChooseUsSection,
    CategoriesSection,
    RecommendedSection,
    TestimonialsSection,
  ],
  template: `
    <app-hero-section />
    <app-recommended-section />
    <app-choose-us-section />
    <app-categories-section />
    <app-banner-section />
    <app-testimonials-section />
  `,
})
export class Home {}
