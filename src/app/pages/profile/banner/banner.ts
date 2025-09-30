import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { IUser } from '@shared/interfaces/global';
import { MeService } from 'src/app/services/me/me.service';

@Component({
  selector: 'app-profile-banner',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center gap-2 relative">
      <div
        class="w-9 h-9 rounded-full bg-white absolute top-4 right-4 flex items-center justify-center"
      >
        <img src="/assets/icons/edit.svg" alt="Edit" class="Edit Icon" />
      </div>

      <div class="w-full max-h-50 md:max-h-70 overflow-hidden rounded-md shadow-xl md:rounded-xl">
        <img
          src="/assets/images/profile-banner.png"
          alt="Profile Banner"
          class="w-full h-wull min-h-[200px]  md:!min-h-[280px] object-cover"
        />
      </div>

      <!-- Profile Photo -->
      <ng-container *ngIf="currentUser$ | async as user; else guest">
        <div
          class="w-34 md:w-40 h-34 md:h-40 rounded-full overflow-hidden absolute top-[45%] md:top-[55%] border-3 border-primary-blue"
        >
          <img
            [src]="user.profilePhoto || '/assets/images/testimonial-1.png'"
            [alt]="user.firstName"
            class="w-full h-full object-cover"
          />
        </div>
      </ng-container>

      <ng-template #guest>
        <div
          class="w-34 md:w-40 h-34 md:h-40 rounded-full overflow-hidden absolute top-[45%] md:top-[55%] border-3 border-primary-blue"
        >
          <img
            src="/assets/images/testimonial-1.png"
            alt="User Image"
            class="w-full h-full object-cover"
          />
          <img />
        </div>
      </ng-template>
    </div>
  `,
})
export class ProfileBanner {
  readonly meService = inject(MeService);

  /** Strongly typed observable for current user */
  readonly currentUser$: Observable<IUser | undefined> = this.meService.me;
}
