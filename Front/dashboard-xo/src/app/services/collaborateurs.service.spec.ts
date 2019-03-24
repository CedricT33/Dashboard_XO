import { TestBed } from '@angular/core/testing';

import { CollaborateursService } from './collaborateurs.service';

describe('XoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaborateursService = TestBed.get(CollaborateursService);
    expect(service).toBeTruthy();
  });
});
