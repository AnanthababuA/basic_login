import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchPopUpComponent } from './patch-pop-up.component';

describe('PatchPopUpComponent', () => {
  let component: PatchPopUpComponent;
  let fixture: ComponentFixture<PatchPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatchPopUpComponent]
    });
    fixture = TestBed.createComponent(PatchPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
