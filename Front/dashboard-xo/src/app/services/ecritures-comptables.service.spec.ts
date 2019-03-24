import { TestBed } from '@angular/core/testing';

import { EcrituresComptablesService } from './ecritures-comptables.service';

describe('EcrituresComptablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcrituresComptablesService = TestBed.get(EcrituresComptablesService);
    expect(service).toBeTruthy();
  });
});
