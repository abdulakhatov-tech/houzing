import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProperty } from '@shared/interfaces/global';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
    <div class="border">
      <div class="relative w-full h-[220px]">
        <img src="/assets/images/product-1.png" alt="Product" class="w-full h-full object-cover" />

        <span
          class="absolute top-5 left-5 py-1 px-3 rounded-[3px] bg-secondary-blue text-white text-[10px] leading-[100%] font-semibold"
          >FEATURED</span
        >
        <span
          class="absolute top-5 right-5 py-1 px-3 rounded-[3px] bg-primary-blue text-white text-[10px] leading-[100%] font-semibold"
          >FOR SALE</span
        >
        <div
          class="w-10 h-10 rounded-full bg-white absolute bottom-[-20px] right-5 flex items-center justify-center border"
        >
          <img src="/assets/images/product-1.png" alt="user" class="w-9 h-9 rounded-full" />
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-[16px] leading-6 font-semibold">{{product?.title}}</h3>
        <p class="text-sm text-gray-500 mt-1">{{product?.address}}</p>

        <ul class="mt-4 flex items-end justify-between gap-1">
          <li class="flex flex-col items-center gap-1">
            <img src='/assets/icons/bed-gray.svg' alt='bed' />
            <span class="text-sm text-gray-500 ml-1">{{product?.beds}} Beds</span>
          </li>
          <li class="flex flex-col items-center gap-1">
            <img src='/assets/icons/bath-gray.svg' alt='bath' />
            <span class="text-sm text-gray-500 ml-1">{{product?.baths}} Baths</span>
          </li>
          <li class="flex flex-col items-center gap-1">
            <img src='/assets/icons/car-gray.svg' alt='car' />
            <span class="text-sm text-gray-500 ml-1">{{product?.garage}} Garage</span>
          </li>
          <li class="flex flex-col items-center gap-1">
            <img src='/assets/icons/ruler-gray.svg' alt='ruler' />
            <span class="text-sm text-gray-500 ml-1">{{product?.area}} Sq Ft</span>
          </li>
        </ul>
      </div>
      <div class="border-t pt-2 px-5 pb-5 flex items-center justify-between gap-4">
        <div class="flex flex-col">
          
          <span class="text-[12px] font-normal line-through text-gray-500">{{product?.oldPrice | currency}}/mo</span>
          <strong class="text-[16px] leading-6 font-semibold">{{product?.price | currency}}/mo</strong>
        </div>

        <div class="flex items-center gap-1">
          <div class="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer">
            <img src='/assets/icons/resize-gray.svg' alt='resize' />
          </div>
          <div class="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer">
            <img src='/assets/icons/heart-gray.svg' alt='heart' />
          </div>
        </div>

      </div>
    </div>
  `,
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: IProperty | null = null
}
