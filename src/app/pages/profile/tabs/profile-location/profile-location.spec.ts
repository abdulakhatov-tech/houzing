import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocation } from './profile-location';

describe('ProfileLocation', () => {
  let component: ProfileLocation;
  let fixture: ComponentFixture<ProfileLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
