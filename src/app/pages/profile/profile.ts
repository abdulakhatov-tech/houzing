import { Component } from '@angular/core';

import { ProfileTabs } from './tabs/tabs';
import { ProfileBanner } from './banner/banner';
import { ProfileHeader } from './header/header';

@Component({
  selector: 'app-profile',
  imports: [ProfileBanner, ProfileHeader, ProfileTabs],
  standalone: true,
  template: `
    <section class="py-4 md:py-6">
      <div class="container">
        <div class="flex flex-col gap-2">
          <app-profile-banner />
          <app-profile-header />
          <app-profile-tabs />

         
        </div>
      </div>
    </section>
  `,
})
export class Profile {}
