import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProducts } from './profile-products';

describe('ProfileProducts', () => {
  let component: ProfileProducts;
  let fixture: ComponentFixture<ProfileProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
