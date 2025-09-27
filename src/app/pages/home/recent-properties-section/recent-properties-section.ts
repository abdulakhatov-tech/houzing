import { Component } from '@angular/core';
import { productsList } from '@shared/constants';
import { IProperty } from '@shared/interfaces/global';
import { ProductsCarousel } from '@shared/components/products-carousel/products-carousel';

@Component({
  selector: 'app-recent-properties-section',
  imports: [ProductsCarousel],
  template: `
    <app-products-carousel
      title="Recent Properties for Rent"
      description="Discover freshly listed properties for rent—ideal homes and apartments waiting for you today."
      [products]="products"
    />
  `,
})
export class RecentPropertiesSection {
  readonly products: IProperty[] = productsList.slice(5, 10);
}
