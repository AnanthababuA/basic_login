import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCommuniAlertpopComponent } from './last-communi-alertpop.component';

describe('LastCommuniAlertpopComponent', () => {
  let component: LastCommuniAlertpopComponent;
  let fixture: ComponentFixture<LastCommuniAlertpopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastCommuniAlertpopComponent]
    });
    fixture = TestBed.createComponent(LastCommuniAlertpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
