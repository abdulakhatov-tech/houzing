import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDialogModule } from '@shared/components/dialog/dialog.component';
import { ZardDialogService } from '@shared/components/dialog/dialog.service';
import { menuItems, socialMediaItems } from '@shared/constants';
import { IMenuItem, ISocialMediaItem } from '@shared/interfaces/global';

// --- Dialog Content Component ---
@Component({
  selector: 'app-menu-modal',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="h-[60vh] flex flex-col justify-center gap-16">
      <!-- Navigation Links -->
      <ul class="flex flex-col items-center gap-6">
        <li *ngFor="let item of menu">
          <a
            [routerLink]="item.path"
            routerLinkActive="border-b-1 border-black font-semibold"
            class="text-black text-[16px] font-normal hover:font-semibold hover:border-b-1 hover:border-black transition-all duration-300"
            >{{ item.label }}</a
          >
        </li>
      </ul>

      <ul class="flex items-center justify-center gap-1">
        <li *ngFor="let item of socialMediaItems">
          <a title="{{ item.label }}" [routerLink]="item.path">
            <div
              class="w-9 h-9 rounded-[3px] flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
            >
              <img [src]="item.icon" alt="item.label" />
            </div>
          </a>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./menu-modal.css'],
})
export class MenuModal {
  menu: IMenuItem[] = menuItems;
  socialMediaItems: ISocialMediaItem[] = socialMediaItems;
}

// --- Button Component that opens the dialog ---
@Component({
  selector: 'app-menu-modal-button',
  standalone: true,
  imports: [ZardDialogModule],
  template: `
    <img
      src="assets/icons/hamburger-menu.svg"
      alt="Menu"
      (click)="openDialog()"
      class="w-5 md:w-6 h-5 md:h-6"
    />
  `,
})
export class MenuModalComponent {
  private readonly dialogService = inject(ZardDialogService);

  openDialog() {
    this.dialogService.create({
      zContent: MenuModal, // Dialog content component
      zWidth: '100%',
      zHideFooter: true,
    });
  }
}
