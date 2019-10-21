import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnswersCheckboxComponent } from './form-answers-checkbox.component';

describe('FormAnswersCheckboxComponent', () => {
  let component: FormAnswersCheckboxComponent;
  let fixture: ComponentFixture<FormAnswersCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnswersCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnswersCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
