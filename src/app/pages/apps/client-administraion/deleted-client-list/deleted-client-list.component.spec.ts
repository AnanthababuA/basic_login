import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedClientListComponent } from './deleted-client-list.component';

describe('DeletedClientListComponent', () => {
  let component: DeletedClientListComponent;
  let fixture: ComponentFixture<DeletedClientListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedClientListComponent]
    });
    fixture = TestBed.createComponent(DeletedClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
