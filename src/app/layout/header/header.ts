import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { menuItems } from '@shared/constants';
import { IMenuItem } from '@shared/interfaces/global';
import { MenuModalComponent } from './menu-modal/menu-modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MenuModalComponent, ZardButtonComponent],
  templateUrl: './header.html',
})
export class Header {
  readonly authService = inject(AuthService);
  menu: IMenuItem[] = menuItems;
}
