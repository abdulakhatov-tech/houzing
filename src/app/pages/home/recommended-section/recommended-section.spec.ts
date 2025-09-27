import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedSection } from './recommended-section';

describe('RecommendedSection', () => {
  let component: RecommendedSection;
  let fixture: ComponentFixture<RecommendedSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
