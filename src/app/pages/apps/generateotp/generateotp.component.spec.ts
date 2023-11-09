import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateotpComponent } from './generateotp.component';

describe('GenerateotpComponent', () => {
  let component: GenerateotpComponent;
  let fixture: ComponentFixture<GenerateotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateotpComponent]
    });
    fixture = TestBed.createComponent(GenerateotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
