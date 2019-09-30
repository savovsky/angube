import { TestBed } from '@angular/core/testing';

import { FormDefaultService } from './form-default.service';

describe('FormDefaultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormDefaultService = TestBed.get(FormDefaultService);
    expect(service).toBeTruthy();
  });
});
