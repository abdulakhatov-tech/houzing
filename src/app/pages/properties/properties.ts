import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ZardSelectComponent } from '@shared/components/select/select.component';
import { ZardSelectItemComponent } from '@shared/components/select/select-item.component';
import { ProductCard } from '@shared/components/product-card/product-card';
import { ZardPaginationModule } from '@shared/components/pagination/pagination.module';

@Component({
  selector: 'app-properties',
  imports: [
    FormsModule,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ProductCard,
    ZardPaginationModule,
  ],
  template: `
    <section id="properties" class="py-12 md:py-14 pb-20">
      <div class="container">
        <h1 class="text-3xl leading-9 text-center font-semibold">Properties</h1>
        <p class="text-center text-lg mt-2 max-w-xl mx-auto">
          Browse our curated list of available properties, including apartments, homes, and
          commercial spaces.
        </p>

        <div class="mt-12 md:mt-14 flex items-end justify-between w-full">
          <p class="flex-1"><strong>12,474</strong> results</p>

          <div>
            <z-select placeholder="Sort by" class="w-fit">
              <z-select-item value="apple">Apple</z-select-item>
              <z-select-item value="banana">Banana</z-select-item>
              <z-select-item value="blueberry">Blueberry</z-select-item>
              <z-select-item value="grapes">Grapes</z-select-item>
              <z-select-item value="pineapple" disabled>Pineapple</z-select-item>
            </z-select>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <app-product-card />
          <app-product-card />
          <app-product-card />
          <app-product-card />
          <app-product-card />
          <app-product-card />
          <app-product-card />
        </div>

        <div class="mt-10">
          <z-pagination [zPageIndex]="currentPage" [zTotal]="5" [(ngModel)]="currentPage" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './properties.css',
})
export class Properties {
  protected currentPage = 2;
}
