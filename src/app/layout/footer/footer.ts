import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { footerItems } from '@shared/constants';
import { IFooterSection } from '@shared/interfaces/global';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-primary-blue pt-8 md:pt-10 lg:pt-12">
      <div class="container">
        <nav class="grid sm:grid-cols-2 md:flex justify-between gap-12 md:gap-14">
          <div *ngFor="let column of footerItems" class="flex flex-col gap-6">
            <h4 class="text-white font-semibold text-[16px] leading-6">{{ column.title }}</h4>

            <ul class="flex flex-col gap-4 max-w-[256px] lg:max-w-full">
              <li *ngFor="let item of column.items">
                <a
                  [href]="item.link"
                  class="flex items-center gap-3 text-white text-sm leading-5 font-normal hover:font-semibold transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    *ngIf="item.icon"
                    [src]="item.icon"
                    alt="{{ item.text }}"
                    class="w-[18px] h-[18px]"
                  />
                  {{ item.text }}
                </a>
              </li>
              <li *ngIf="column.socialMediaItems?.length">
                <ul class="flex items-center gap-2">
                  <li *ngFor="let item of column.socialMediaItems">
                    <a title="{{ item.label }}" [routerLink]="item.path">
                      <div
                        class="w-9 h-9 rounded-[3px] flex items-center justify-center bg-trans bg-white hover:bg-gray-100 transition-all duration-300"
                      >
                        <img [src]="item.icon" [alt]="item.label" />
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <hr class="border-t border-white/15 mt-12 md:mt-10" />

      <div class="container py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <img src="assets/icons/logo.svg" alt="Houzing" class="w-7 md:w-8 h-8 md:h-9" />
            <h4 class="text-white text-xl font-medium">Houzing</h4>
          </div>

          <p class="text-white text-sm leading-5 font-normal text-center max-w-[234px] sm:max-w-full">
            Copyright © {{ currentYear }} CreativeLayers. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.css',
})
export class Footer {
  footerItems: IFooterSection[] = footerItems;
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
