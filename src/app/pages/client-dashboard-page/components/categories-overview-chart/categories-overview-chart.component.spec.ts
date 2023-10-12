import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOverviewChartComponent } from './categories-overview-chart.component';

describe('CategoriesOverviewChartComponent', () => {
  let component: CategoriesOverviewChartComponent;
  let fixture: ComponentFixture<CategoriesOverviewChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesOverviewChartComponent]
    });
    fixture = TestBed.createComponent(CategoriesOverviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
