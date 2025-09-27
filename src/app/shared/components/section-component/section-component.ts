import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-component',
  imports: [CommonModule],
  standalone: true,
  template: `
    <section id="why-choose-us" 
      class="py-10 md:py-12"
      [ngStyle]="{ 'background-color': bgColor }">
      <div class="container">
        <h2 class="text-2xl md:text-[28px] font-semibold leading-9 -space-[2%] text-center">
          {{ title }}
        </h2>
        <p
          class="text-[16px] font-normal leading-6 text-gray-500 text-center mt-1 md:mt-2 mb-8 max-w-[600px] mx-auto"
        >
          {{ description }}
        </p>

        <!-- content passed from parent -->
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class SectionComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() bgColor = '#fff';
}
