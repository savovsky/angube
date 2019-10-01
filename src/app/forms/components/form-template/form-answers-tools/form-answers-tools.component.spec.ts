import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnswersToolsComponent } from './form-answers-tools.component';

describe('FormAnswersToolsComponent', () => {
  let component: FormAnswersToolsComponent;
  let fixture: ComponentFixture<FormAnswersToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnswersToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnswersToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
