import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertContentComponent } from './alert-content.component';

describe('AlertContentComponent', () => {
  let component: AlertContentComponent;
  let fixture: ComponentFixture<AlertContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertContentComponent]
    });
    fixture = TestBed.createComponent(AlertContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
