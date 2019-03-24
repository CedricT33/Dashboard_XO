import { TestBed } from '@angular/core/testing';

import { DocsEnteteService } from './docs-entete.service';

describe('DocsEnteteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocsEnteteService = TestBed.get(DocsEnteteService);
    expect(service).toBeTruthy();
  });
});
