import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, ZardButtonComponent],
  template: `
    <section class="bg-white">
      <div class="container">
        <div class="min-h-[60vh] flex flex-col justify-center items-center gap-4">
          <h1
            class="text-[24px] sm:text-[32px] md:text-[42px] lg:text-[52px] xl:text-[62px] 2xl:text-[72px] font-bold text-center"
          >
            404 - Page Not Found
          </h1>
          <p class="text-sm md:text-lg font-normal text-center">
            The page you are looking for does not exist.
          </p>
          <a routerLink="/">
            <button z-button zSize="default">Go back to Home</button>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {}
