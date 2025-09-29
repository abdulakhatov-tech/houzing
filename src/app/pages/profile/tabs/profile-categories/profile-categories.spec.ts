import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCategories } from './profile-categories';

describe('ProfileCategories', () => {
  let component: ProfileCategories;
  let fixture: ComponentFixture<ProfileCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
