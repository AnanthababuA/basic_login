import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegstatusclientComponent } from './regstatusclient.component';

describe('RegstatusclientComponent', () => {
  let component: RegstatusclientComponent;
  let fixture: ComponentFixture<RegstatusclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegstatusclientComponent]
    });
    fixture = TestBed.createComponent(RegstatusclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
