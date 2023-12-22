import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedClientPopUpComponent } from './blocked-client-pop-up.component';

describe('BlockedClientPopUpComponent', () => {
  let component: BlockedClientPopUpComponent;
  let fixture: ComponentFixture<BlockedClientPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockedClientPopUpComponent]
    });
    fixture = TestBed.createComponent(BlockedClientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
