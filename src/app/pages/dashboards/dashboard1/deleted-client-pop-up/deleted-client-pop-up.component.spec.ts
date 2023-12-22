import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedClientPopUpComponent } from './deleted-client-pop-up.component';

describe('DeletedClientPopUpComponent', () => {
  let component: DeletedClientPopUpComponent;
  let fixture: ComponentFixture<DeletedClientPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedClientPopUpComponent]
    });
    fixture = TestBed.createComponent(DeletedClientPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
