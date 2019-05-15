import { async, TestBed } from '@angular/core/testing';

import { DocsEnteteService } from './docs-entete.service';
import { AppModule } from '../app.module';

describe('DocsEnteteService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocsEnteteService = TestBed.get(DocsEnteteService);
    expect(service).toBeTruthy();
  });
});
