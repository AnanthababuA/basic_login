import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyChartComponent } from './hierarchy-chart.component';

describe('HierarchyChartComponent', () => {
  let component: HierarchyChartComponent;
  let fixture: ComponentFixture<HierarchyChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HierarchyChartComponent]
    });
    fixture = TestBed.createComponent(HierarchyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
