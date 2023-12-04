import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedClientComponent } from './deleted-client.component';

describe('DeletedClientComponent', () => {
  let component: DeletedClientComponent;
  let fixture: ComponentFixture<DeletedClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedClientComponent]
    });
    fixture = TestBed.createComponent(DeletedClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
