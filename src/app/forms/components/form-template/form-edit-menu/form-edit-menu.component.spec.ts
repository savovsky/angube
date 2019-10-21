import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditMenuComponent } from './form-edit-menu.component';

describe('FormEditMenuComponent', () => {
  let component: FormEditMenuComponent;
  let fixture: ComponentFixture<FormEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
