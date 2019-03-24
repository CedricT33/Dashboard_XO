import { TestBed } from '@angular/core/testing';

import { DocsLigneService } from './docs-ligne.service';

describe('DocsLigneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocsLigneService = TestBed.get(DocsLigneService);
    expect(service).toBeTruthy();
  });
});
