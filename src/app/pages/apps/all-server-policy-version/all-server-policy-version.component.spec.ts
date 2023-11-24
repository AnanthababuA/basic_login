import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServerPolicyVersionComponent } from './all-server-policy-version.component';

describe('AllServerPolicyVersionComponent', () => {
  let component: AllServerPolicyVersionComponent;
  let fixture: ComponentFixture<AllServerPolicyVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllServerPolicyVersionComponent]
    });
    fixture = TestBed.createComponent(AllServerPolicyVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
