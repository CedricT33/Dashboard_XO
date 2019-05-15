import { async, TestBed } from '@angular/core/testing';

import { DocsLigneService } from './docs-ligne.service';
import { AppModule } from '../app.module';

describe('DocsLigneService', () => {
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
    const service: DocsLigneService = TestBed.get(DocsLigneService);
    expect(service).toBeTruthy();
  });
});
