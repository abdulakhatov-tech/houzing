import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { menuItems } from '@shared/constants';
import { IMenuItem } from '@shared/interfaces/global';
import { MenuModalComponent } from './menu-modal/menu-modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MenuModalComponent],
  template: `
    <header class="bg-primary-blue py-3 md:py-[14px]">
      <div class="container">
        <nav class="flex items-center justify-between gap-6">
          <!-- Hamburger Menu -->
          <div class="md:hidden">
            <app-menu-modal-button />
          </div>

          <!-- Logo -->
          <div class="flex items-center gap-2">
            <img src="assets/icons/logo.svg" alt="Houzing" class="w-7 md:w-8 h-8 md:h-9" />
            <h4 class="text-white text-xl font-medium">Houzing</h4>
          </div>

          <!-- Navigation Links -->
          <ul class="hidden md:flex items-center gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
            <li *ngFor="let item of menu">
              <a
                [routerLink]="item.path"
                routerLinkActive="border-b-1 border-white font-semibold"
                class="text-white text-[16px] font-normal hover:font-semibold hover:border-b-1 hover:border-white transition-all duration-300"
                >{{ item.label }}</a
              >
            </li>
          </ul>

          <!-- User Icon -->
          <img src="assets/icons/user.svg" alt="User" class="w-5 md:w-6 h-5 md:h-6" />
        </nav>
      </div>
    </header>
  `,
  styleUrls: ['./header.css'],
})
export class Header {
  menu: IMenuItem[] = menuItems;
}
