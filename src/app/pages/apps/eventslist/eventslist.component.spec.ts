import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventslistComponent } from './eventslist.component';

describe('EventslistComponent', () => {
  let component: EventslistComponent;
  let fixture: ComponentFixture<EventslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventslistComponent]
    });
    fixture = TestBed.createComponent(EventslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
