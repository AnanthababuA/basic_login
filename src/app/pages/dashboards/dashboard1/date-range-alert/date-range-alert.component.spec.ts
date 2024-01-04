import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeAlertComponent } from './date-range-alert.component';

describe('DateRangeAlertComponent', () => {
  let component: DateRangeAlertComponent;
  let fixture: ComponentFixture<DateRangeAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangeAlertComponent]
    });
    fixture = TestBed.createComponent(DateRangeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
