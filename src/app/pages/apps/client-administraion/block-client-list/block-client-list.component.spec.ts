import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockClientListComponent } from './block-client-list.component';

describe('BlockClientListComponent', () => {
  let component: BlockClientListComponent;
  let fixture: ComponentFixture<BlockClientListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockClientListComponent]
    });
    fixture = TestBed.createComponent(BlockClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
