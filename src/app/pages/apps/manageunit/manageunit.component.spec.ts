import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageunitComponent } from './manageunit.component';

describe('ManageunitComponent', () => {
  let component: ManageunitComponent;
  let fixture: ComponentFixture<ManageunitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageunitComponent]
    });
    fixture = TestBed.createComponent(ManageunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
