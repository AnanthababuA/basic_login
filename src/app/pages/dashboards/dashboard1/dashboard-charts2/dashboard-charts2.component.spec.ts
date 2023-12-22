import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCharts2Component } from './dashboard-charts2.component';

describe('DashboardCharts2Component', () => {
  let component: DashboardCharts2Component;
  let fixture: ComponentFixture<DashboardCharts2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCharts2Component]
    });
    fixture = TestBed.createComponent(DashboardCharts2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
