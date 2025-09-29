import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-banner',
  imports: [],
  standalone: true,
  template: `
    <div class="flex flex-col items-center gap-2 relative">
      <div
        class="w-9 h-9 rounded-full bg-white absolute top-4 right-4 flex items-center justify-center"
      >
        <img src="/assets/icons/edit.svg" alt="Edit" class="Edit Icon" />
      </div>

      <div class="w-full max-h-50 md:max-h-70 overflow-hidden rounded-xl">
        <img
          src="/assets/images/profile-banner.png"
          alt="Profile Banner"
          class="w-full h-wull min-h-[200px]  md:!min-h-[280px] object-cover"
        />
      </div>

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
    </div>
  `,
})
export class ProfileBanner {}
