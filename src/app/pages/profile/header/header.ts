import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { IUser } from '@shared/interfaces/global';
import { formatUzPhone } from '@shared/utils/helpers';
import { MeService } from 'src/app/services/me/me.service';

@Component({
  selector: 'app-profile-header',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1 mb-6  mt-6 md:mt-8" *ngIf="vm$ | async as vm">
      <h1 class="text-center text-xl md:text-[26px] font-semibold">
        {{ vm?.user?.firstName ?? '' }} {{ vm?.user?.lastName ?? '' }}
      </h1>
      <h3 class="text-center text-lg md:text-xl font-semibold">
        {{ vm?.user?.role ?? 'No Role' | titlecase }}
      </h3>
      <ul class="flex flex-col md:flex-row items-center md:gap-3 justify-center mb-1">
        <li *ngIf="vm?.formattedPhone">
          Tel:
          <a
            [href]="'tel:' + vm?.user?.phoneNumber"
            class="text-secondary-blue text-[16px] font-medium"
            >{{ vm?.formattedPhone }}</a
          >
        </li>
        <li>
          <span class="hidden md:block" *ngIf="vm?.formattedPhone && vm?.user?.email">|</span>
        </li>
        <li>
          Email:
          <a
            [href]="'mailto:' + vm?.user?.email"
            class="text-secondary-blue text-[16px] font-medium"
          >
            {{ vm?.user?.email ?? 'No Email' }}
          </a>
        </li>
      </ul>

      <p class="text-base text-center max-w-4xl mx-auto font-sans">
        {{ vm?.user?.description ?? 'No Description' }}
      </p>
    </div>
  `,
})
export class ProfileHeader {
  readonly meService = inject(MeService);

  /** Strongly typed observable for current user */
  readonly vm$: Observable<{ user: IUser; formattedPhone: string }> = this.meService.me.pipe(
    map((user) => ({
      user: user!,
      formattedPhone: formatUzPhone(user?.phoneNumber),
    }))
  );
}
