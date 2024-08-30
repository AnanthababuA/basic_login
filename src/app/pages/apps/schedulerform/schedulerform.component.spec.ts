import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerformComponent } from './schedulerform.component';

describe('SchedulerformComponent', () => {
  let component: SchedulerformComponent;
  let fixture: ComponentFixture<SchedulerformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerformComponent]
    });
    fixture = TestBed.createComponent(SchedulerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
