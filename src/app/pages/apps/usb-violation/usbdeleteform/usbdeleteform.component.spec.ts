import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsbdeleteformComponent } from './usbdeleteform.component';

describe('UsbdeleteformComponent', () => {
  let component: UsbdeleteformComponent;
  let fixture: ComponentFixture<UsbdeleteformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsbdeleteformComponent]
    });
    fixture = TestBed.createComponent(UsbdeleteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
