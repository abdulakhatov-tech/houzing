import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import {
  ZardPopoverComponent,
  ZardPopoverDirective,
} from '@shared/components/popover/popover.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZardInputDirective,
    ZardButtonComponent,
    ZardPopoverComponent,
    ZardPopoverDirective,
  ],
  template: `
    <section id="search-section" class="py-[10px]">
      <div class="container relative">
        <form [formGroup]="searchForm" class="flex items-center gap-2 md:gap-4">
          <input
            z-input
            formControlName="keyword"
            placeholder="Enter an address, city, or ZIP code"
            class="flex-1 px-4 h-10"
          />

          <button
            z-button
            zType="outline"
            class="h-10 sm:w-fit md:w-35"
            zPopover
            [zContent]="popoverContent"
          >
            <img src="/assets/icons/setting-lines.svg" alt="Search" />
            <span class="hidden sm:block">Advanced</span>
          </button>

          <ng-template #popoverContent>
            <z-popover
              class="w-[90vw] sm:w-[92vw] lg:w-[900px] absolute -right-[80px] sm:-right-[170px] md:-right-[265px] top-2"
            >
              <div class="space-y-2">
                <h4 class="font-medium leading-none">Address</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  <input
                    z-input
                    placeholder="Country"
                    formControlName="country"
                    class="px-3 md:px-4 h-10"
                  />
                  <input
                    z-input
                    placeholder="Region"
                    formControlName="region"
                    class="px-3 md:px-4 h-10"
                  />
                  <input
                    z-input
                    placeholder="City"
                    formControlName="city"
                    class="px-3 md:px-4 h-10"
                  />
                  <input
                    z-input
                    placeholder="Zip code"
                    formControlName="zip"
                    class="px-3 md:px-4 h-10"
                  />
                </div>

                <h4 class="font-medium leading-none mt-3 md:mt-5">Apartment Info</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  <input z-input placeholder="Rooms" formControlName="rooms" class="px-4 h-10" />
                  <input z-input placeholder="Size" formControlName="size" class="px-4 h-10" />
                  <input z-input placeholder="Sort" formControlName="sort" class="px-4 h-10" />
                </div>

                <h4 class="font-medium leading-none mt-3 md:mt-5">Price</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  <input
                    z-input
                    placeholder="Min price"
                    formControlName="minPrice"
                    class="px-3 md:px-4 h-10"
                  />
                  <input
                    z-input
                    placeholder="Max price"
                    formControlName="maxPrice"
                    class="px-4 h-10"
                  />
                </div>

                <div class="flex items-center justify-end gap-3 mt-5 md:mt-7">
                  <button
                    z-button
                    zType="destructive"
                    class="flex-1 md:w-30"
                    *ngIf="hasValues()"
                    (click)="resetParams()"
                  >
                    Clear
                  </button>
                  <!-- <button z-button zType="default" class="flex-1 md:w-30 bg-secondary-blue hover:bg-secondary-blue/90">Submit</button> -->
                </div>
              </div>
            </z-popover>
          </ng-template>

          <button
            z-button
            class="bg-secondary-blue h-10 sm:w-fit md:w-45 hover:bg-secondary-blue/90"
          >
            <img src="/assets/icons/search.svg" alt="Search" />
            <span class="hidden sm:block">Search</span>
          </button>
        </form>
      </div>
    </section>
  `,
  styleUrl: './search-section.css',
})
export class SearchSection {
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.searchForm = this.fb.group({
      keyword: [''],
      country: [''],
      region: [''],
      city: [''],
      zip: [''],
      rooms: [''],
      size: [''],
      sort: [''],
      minPrice: [''],
      maxPrice: [''],
    });
  }

  ngOnInit() {
    // 1. Initialize form from query params if they exist
    this.route.queryParams.subscribe((params) => {
      this.searchForm.patchValue(params, { emitEvent: false });
    });
  
    // 2. Listen to form changes and update query params
    this.searchForm.valueChanges.pipe(debounceTime(400)).subscribe((values) => {
      this.router.navigate(['/properties'], {
        queryParams: this.cleanParams(values), // always replace params
      });
    });
  
    // 3. Reset form when leaving /properties
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((event: any) => {
      if (!event.url.startsWith('/properties')) {
        this.searchForm.reset({}, { emitEvent: false });
      }
    });
  }

  private cleanParams(values: any) {
    return Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== null && v !== '')
    );
  }

  resetParams() {
    this.searchForm.reset();
    this.router.navigate([], { queryParams: {} });
  }

  hasValues(): boolean {
    return Object.values(this.searchForm.value).some((v) => v && v !== '');
  }
}
