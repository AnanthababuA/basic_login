import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockClientFormComponent } from './block-client-form.component';

describe('BlockClientFormComponent', () => {
  let component: BlockClientFormComponent;
  let fixture: ComponentFixture<BlockClientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockClientFormComponent]
    });
    fixture = TestBed.createComponent(BlockClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
