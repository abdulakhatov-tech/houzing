import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { footerItems } from '@shared/constants';
import { IFooterSection } from '@shared/interfaces/global';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  footerItems: IFooterSection[] = footerItems;
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
