import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUsSection } from './choose-us-section';

describe('ChooseUsSection', () => {
  let component: ChooseUsSection;
  let fixture: ComponentFixture<ChooseUsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseUsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseUsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
