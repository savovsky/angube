import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnswersChoiceComponent } from './form-answers-choice.component';

describe('FormAnswersChoiceComponent', () => {
  let component: FormAnswersChoiceComponent;
  let fixture: ComponentFixture<FormAnswersChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnswersChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnswersChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
