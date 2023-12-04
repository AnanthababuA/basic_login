import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClamAvPopUpComponent } from './clam-av-pop-up.component';

describe('ClamAvPopUpComponent', () => {
  let component: ClamAvPopUpComponent;
  let fixture: ComponentFixture<ClamAvPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClamAvPopUpComponent]
    });
    fixture = TestBed.createComponent(ClamAvPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
