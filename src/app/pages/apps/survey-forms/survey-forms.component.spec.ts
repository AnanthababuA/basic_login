import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFormsComponent } from './survey-forms.component';

describe('SurveyFormsComponent', () => {
  let component: SurveyFormsComponent;
  let fixture: ComponentFixture<SurveyFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyFormsComponent]
    });
    fixture = TestBed.createComponent(SurveyFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
