import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { heroSectionItems } from '@shared/constants';
import { IProperty } from '@shared/interfaces/global';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-hero-section',
  imports: [ZardButtonComponent, CurrencyPipe, CommonModule, CarouselModule],
  standalone: true,
  templateUrl: './hero-section.html',
})
export class HeroSection {
  heroSectionItems: IProperty[] = heroSectionItems;
}
