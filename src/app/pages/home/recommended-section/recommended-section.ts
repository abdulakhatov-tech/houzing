import { Component } from '@angular/core';
import { productsList } from '@shared/constants';
import { IProperty } from '@shared/interfaces/global';
import { ProductsCarousel } from '@shared/components/products-carousel/products-carousel';

@Component({
  selector: 'app-recommended-section',
  imports: [ProductsCarousel],
  template: `
    <app-products-carousel
      title="Recommended"
      description="Nulla quis curabitur velit volutpat auctor bibendum consectetur sit."
      [products]="products"
    />
  `,
})
export class RecommendedSection {
  readonly products: IProperty[] = productsList.slice(0, 5);
}
