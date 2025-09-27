import { Component } from '@angular/core';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { heroSectionItems } from '@shared/constants';
import { IProperty } from '@shared/interfaces/global';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-hero-section',
  imports: [ZardButtonComponent, CurrencyPipe, NgStyle],
  template: `
    <section
      id="hero-section"
      class="bg-cover bg-center relative"
      [ngStyle]="{ 'background-image': 'url(' + randomProperty.image + ')' }"
    >
      <!-- Shadow overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/70 md:from-black/60 via-black/50 md:via-black/40 to-transparent"
      ></div>

      <div class="container relative z-10">
        <div
          class="flex flex-col justify-center items-center text-white h-[70vh] md:h-[60vh] gap-2"
        >
          <h1
            class="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[36px] xl:text-[44px] leading-12 space-[-2%] font-bold text-center"
          >
            {{ randomProperty.title }}
          </h1>
          <p class="text-[16px] leading-6 font-normal text-center">{{ randomProperty.address }}</p>

          <ul class="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-6">
            <li class="flex flex-col items-center gap-[2px]">
              <img src="/assets/icons/bed.svg" alt="bed" />
              <span>{{ randomProperty.beds }} beds</span>
            </li>
            <li class="flex flex-col items-center gap-[2px]">
              <img src="/assets/icons/bath.svg" alt="bath" />
              <span>{{ randomProperty.baths }} baths</span>
            </li>
            <li class="flex flex-col items-center gap-[2px]">
              <img src="/assets/icons/car.svg" alt="garage" />
              <span>{{ randomProperty.garage }} garages</span>
            </li>
            <li class="flex flex-col items-center gap-[2px]">
              <img src="/assets/icons/ruler.svg" alt="area" />
              <span>{{ randomProperty.area }} Sq Ft</span>
            </li>
          </ul>

          <strong>{{ randomProperty.price | currency : 'USD' : 'symbol' : '1.0-0' }}/mo</strong>

          <button
            z-button
            zType="outline"
            class="bg-transparent hover:bg-transparent hover:text-white mt-15 px-10 rounded-[4px]"
          >
            Read more
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero-section.css',
})
export class HeroSection {
  heroSectionItems: IProperty[] = heroSectionItems;

  get randomProperty(): IProperty {
    const randomIndex = Math.floor(Math.random() * this.heroSectionItems.length);
    return this.heroSectionItems[randomIndex];
  }
}
