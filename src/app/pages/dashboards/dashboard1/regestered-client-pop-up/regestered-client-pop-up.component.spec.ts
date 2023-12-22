import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegesteredClientPopUpComponent } from './regestered-client-pop-up.component';

describe('RegesteredClientPopUpComponent', () => {
  let component: RegesteredClientPopUpComponent;
  let fixture: ComponentFixture<RegesteredClientPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegesteredClientPopUpComponent]
    });
    fixture = TestBed.createComponent(RegesteredClientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
