import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaladminComponent } from './localadmin.component';

describe('LocaladminComponent', () => {
  let component: LocaladminComponent;
  let fixture: ComponentFixture<LocaladminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocaladminComponent]
    });
    fixture = TestBed.createComponent(LocaladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
