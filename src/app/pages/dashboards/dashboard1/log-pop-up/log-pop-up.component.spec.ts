import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPopUpComponent } from './log-pop-up.component';

describe('LogPopUpComponent', () => {
  let component: LogPopUpComponent;
  let fixture: ComponentFixture<LogPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogPopUpComponent]
    });
    fixture = TestBed.createComponent(LogPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
