import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPopUpComponent } from './policy-pop-up.component';

describe('PolicyPopUpComponent', () => {
  let component: PolicyPopUpComponent;
  let fixture: ComponentFixture<PolicyPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyPopUpComponent]
    });
    fixture = TestBed.createComponent(PolicyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
