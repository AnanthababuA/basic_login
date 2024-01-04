import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsbViolationComponent } from './usb-violation.component';

describe('UsbViolationComponent', () => {
  let component: UsbViolationComponent;
  let fixture: ComponentFixture<UsbViolationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsbViolationComponent]
    });
    fixture = TestBed.createComponent(UsbViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
