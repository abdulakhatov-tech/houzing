import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { menuItems } from '@shared/constants';
import { IMenuItem, IUser } from '@shared/interfaces/global';
import { MenuModalComponent } from './menu-modal/menu-modal';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDropdownModule } from '@shared/components/dropdown/dropdown.module';
import { ZardDividerComponent } from '@shared/components/divider/divider.component';
import { toast } from 'ngx-sonner';
import { ZardDropdownDirective } from '@shared/components/dropdown/dropdown-trigger.directive';
import { MeService } from 'src/app/services/me/me.service';
import { ZardAvatarComponent } from '@shared/components/avatar/avatar.component';
import { map } from 'rxjs';

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
    ZardAvatarComponent,
  ],
  templateUrl: './header.html',
})
export class Header {
  readonly meService = inject(MeService);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // expose the user observable
  readonly currentUser$ = this.meService.me;

  readonly zImageDefault = this.currentUser$.pipe(
    map((user) => ({
      fallback: user?.firstName[0] + '.' + user?.lastName[0],
      url: user?.profilePhoto,
      alt: user?.firstName + ' ' + user?.lastName,
    }))
  );

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
    this.router.navigate(['/profile']);
  }
}
