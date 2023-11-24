import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServerPatchVersionComponent } from './all-server-patch-version.component';

describe('AllServerPatchVersionComponent', () => {
  let component: AllServerPatchVersionComponent;
  let fixture: ComponentFixture<AllServerPatchVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllServerPatchVersionComponent]
    });
    fixture = TestBed.createComponent(AllServerPatchVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
