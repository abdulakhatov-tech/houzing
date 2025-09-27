import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

import { IProperty } from '@shared/interfaces/global';
import { ProductCard } from '../product-card/product-card';
import { SectionComponent } from '../section-component/section-component';

@Component({
  selector: 'app-products-carousel',
  imports: [CarouselModule, SectionComponent, ProductCard],
  templateUrl: './products-carousel.html',
})
export class ProductsCarousel {
  @Input() title: string = '';
  @Input() bgColor: string = '';
  @Input() description: string = '';
  @Input() products: IProperty[] = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
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
