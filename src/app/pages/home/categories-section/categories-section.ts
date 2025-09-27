import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

import { categories } from '@shared/constants';
import { ICategory } from '@shared/interfaces/global';
import { SectionComponent } from '@shared/components/section-component/section-component';

@Component({
  selector: 'app-categories-section',
  imports: [CarouselModule, SectionComponent, CommonModule],
  templateUrl: './categories-section.html',
})
export class CategoriesSection {
  readonly categories: ICategory[] = categories;

  responsiveOptions = [
    {
      breakpoint: '1150px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '824px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1,
      showIndicators: false,
    },
  ];
}
