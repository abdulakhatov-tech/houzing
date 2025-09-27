import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardButtonComponent } from "@shared/components/button/button.component";

@Component({
  selector: 'app-banner-section',
  imports: [CommonModule, ZardButtonComponent],
  templateUrl: './banner-section.html',
})
export class BannerSection {

}
