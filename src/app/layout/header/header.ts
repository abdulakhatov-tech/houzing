import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { menuItems } from '@shared/constants';
import { IMenuItem } from '@shared/interfaces/global';
import { MenuModalComponent } from './menu-modal/menu-modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDropdownModule } from '@shared/components/dropdown/dropdown.module';
import { ZardDividerComponent } from '@shared/components/divider/divider.component';
import { toast } from 'ngx-sonner';
import { ZardDropdownDirective } from '@shared/components/dropdown/dropdown-trigger.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MenuModalComponent,
    ZardButtonComponent,
    ZardDropdownModule,
    ZardDividerComponent,
    ZardDropdownDirective,
  ],
  templateUrl: './header.html',
})
export class Header {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  menu: IMenuItem[] = menuItems;

  async onLogout() {
    this.authService.signOut().subscribe({
      next: (response) => {
        toast.success('Sign Out', {
          description: response?.message,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        toast.error(error?.error?.message);
      },
    });
  }

  onProfile() {
    this.router.navigate(['/profile'])
  }
}
