import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPropertiesSection } from './recent-properties-section';

describe('RecentPropertiesSection', () => {
  let component: RecentPropertiesSection;
  let fixture: ComponentFixture<RecentPropertiesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPropertiesSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPropertiesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
