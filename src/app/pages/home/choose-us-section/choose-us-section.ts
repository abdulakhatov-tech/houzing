import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { whyChooseUsItems } from '@shared/constants';
import { IWhyChooseUsItem } from '@shared/interfaces/global';
import { SectionComponent } from '@shared/components/section-component/section-component';

@Component({
  selector: 'app-choose-us-section',
  imports: [CommonModule, SectionComponent],
  template: `
    <app-section-component
      title="Why Choose Us ?"
      description="Nulla quis curabitur velit volutpat auctor bibendum consectetur sit."
      bgColor="#F5F7FC"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        <div *ngFor="let item of items" class="flex flex-col items-center">
          <img [src]="item.imgUrl" [alt]="item.title" class="w-[50px] h-[50px]" />
          <h4 class="text-center font-semibold text-lg leading-7 mt-5 md:mt-6 mb-2">
            {{ item.title }}
          </h4>
          <p class="text-center font-normal text-[16px] leading-6 text-gray-500">
            {{ item.description }}
          </p>
        </div>
      </div>
    </app-section-component>
  `,
  styleUrl: './choose-us-section.css',
})
export class ChooseUsSection {
  readonly items: IWhyChooseUsItem[] = whyChooseUsItems;
}
