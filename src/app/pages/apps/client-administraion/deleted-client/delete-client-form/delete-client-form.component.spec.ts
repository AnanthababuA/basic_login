import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientFormComponent } from './delete-client-form.component';

describe('DeleteClientFormComponent', () => {
  let component: DeleteClientFormComponent;
  let fixture: ComponentFixture<DeleteClientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteClientFormComponent]
    });
    fixture = TestBed.createComponent(DeleteClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
