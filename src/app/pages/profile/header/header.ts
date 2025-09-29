import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  imports: [],
  standalone: true,
  template: `
    <div class="flex flex-col gap-1 mb-6  mt-6 md:mt-8">
      <h1 class="text-center text-[26px] font-semibold">Islom Abdulakhatov</h1>
      <h3 class="text-center text-xl font-semibold">Software Engineer</h3>
      <ul class="flex flex-col md:flex-row items-center md:gap-3 justify-center mb-1">
        <li>
          Tel:
          <a href="tel:+998995289896" class="text-secondary-blue text-[16px] font-medium"
            >+998995289896</a
          >
        </li>
        <span class="hidden md:block">|</span>
        <li>
          Email:
          <a
            href="mailto:islomabdulakhatov@gmail.com"
            class="text-secondary-blue text-[16px] font-medium"
            >islomabdulakhatov@gmail.com</a
          >
        </li>
      </ul>
      <p class="text-base text-center max-w-4xl mx-auto font-sans">
        I’m Islom Abdulakhatov, a software engineer who loves crafting modern web applications that
        are fast, reliable, and easy to use. Over the years I’ve focused on building scalable
        e-commerce, CRM, and ERP platforms with frameworks like React, Next.js, and Node.js, always
        paying close attention to clean architecture and user experience.
      </p>
    </div>
  `,
})
export class ProfileHeader {}
