import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditDialogComponent } from './form-edit-dialog.component';

describe('FormEditDialogComponent', () => {
  let component: FormEditDialogComponent;
  let fixture: ComponentFixture<FormEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
