import { TestBed } from '@angular/core/testing';

import { ComptesGenerauxService } from './comptes-generaux.service';

describe('ComptesGenerauxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComptesGenerauxService = TestBed.get(ComptesGenerauxService);
    expect(service).toBeTruthy();
  });
});
