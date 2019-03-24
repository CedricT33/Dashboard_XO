import { TestBed } from '@angular/core/testing';

import { ComptesTiersService } from './comptes-tiers.service';

describe('ComptesTiersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComptesTiersService = TestBed.get(ComptesTiersService);
    expect(service).toBeTruthy();
  });
});
