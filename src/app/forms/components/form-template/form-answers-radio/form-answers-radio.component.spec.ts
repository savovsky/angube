import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnswersRadioComponent } from './form-answers-radio.component';

describe('FormAnswersRadioComponent', () => {
  let component: FormAnswersRadioComponent;
  let fixture: ComponentFixture<FormAnswersRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnswersRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnswersRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
