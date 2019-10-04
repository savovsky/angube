import { TestBed } from '@angular/core/testing';

import { DatabaseDashboardService } from './database-dashboard.service';

describe('DatabaseDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseDashboardService = TestBed.get(DatabaseDashboardService);
    expect(service).toBeTruthy();
  });
});
