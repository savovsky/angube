import { TestBed } from '@angular/core/testing';

import { FormEditMenuService } from './form-edit-menu.service';

describe('FormEditMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormEditMenuService = TestBed.get(FormEditMenuService);
    expect(service).toBeTruthy();
  });
});
