import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, inject, computed } from '@angular/core';

import {
  ZardTabComponent,
  ZardTabGroupComponent,
} from '@shared/components/tabs/tabs.component';
import { profileTabs } from '@shared/constants';
import { IProfileTab, TUserRole } from '@shared/interfaces/global';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule, ZardTabComponent, ZardTabGroupComponent, RouterModule],
  template: `
    <z-tab-group (zOnTabChange)="onTabChange($event)">
      <z-tab
        *ngFor="let tab of visibleTabs()"
        [label]="tab.title"
      ></z-tab>
    </z-tab-group>

    <router-outlet />
  `,
})
export class ProfileTabs {
  private readonly router = inject(Router);

  readonly userRole: TUserRole = 'admin';
  readonly profileTabs: IProfileTab[] = profileTabs;

  readonly visibleTabs = computed(() =>
    this.profileTabs.filter((t) => t.roles.includes(this.userRole))
  );

  // Accept the full event object
  onTabChange(event: { index: number; label: string; tab: ZardTabComponent }) {
    const tab = this.visibleTabs()[event.index];
    if (tab) {
      this.router.navigate(['profile', tab.path]);
    }
  }
}
