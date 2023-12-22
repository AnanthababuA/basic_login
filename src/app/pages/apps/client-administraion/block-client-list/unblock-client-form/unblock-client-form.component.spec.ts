import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockClientFormComponent } from './unblock-client-form.component';

describe('UnblockClientFormComponent', () => {
  let component: UnblockClientFormComponent;
  let fixture: ComponentFixture<UnblockClientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnblockClientFormComponent]
    });
    fixture = TestBed.createComponent(UnblockClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
