import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

import { SectionComponent } from '@shared/components/section-component/section-component';
import { ITestimonial } from '@shared/interfaces/global';
import { testimonials } from '@shared/constants';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [SectionComponent, CarouselModule],
  templateUrl: './testimonials-section.html',
})
export class TestimonialsSection {
  readonly testimonials: ITestimonial[] = testimonials;

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
