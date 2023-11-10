import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListregclientComponent } from './listregclient.component';

describe('ListregclientComponent', () => {
  let component: ListregclientComponent;
  let fixture: ComponentFixture<ListregclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListregclientComponent]
    });
    fixture = TestBed.createComponent(ListregclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
