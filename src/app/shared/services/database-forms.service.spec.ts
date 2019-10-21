import { TestBed } from '@angular/core/testing';

import { DatabaseFormsService } from './database-forms.service';

describe('DatabaseFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseFormsService = TestBed.get(DatabaseFormsService);
    expect(service).toBeTruthy();
  });
});
