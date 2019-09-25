import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectChoiceComponent } from './form-select-choice.component';

describe('FormSelectChoiceComponent', () => {
  let component: FormSelectChoiceComponent;
  let fixture: ComponentFixture<FormSelectChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelectChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
