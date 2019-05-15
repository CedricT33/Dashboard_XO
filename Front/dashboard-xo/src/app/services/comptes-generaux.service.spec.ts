import { async, TestBed } from '@angular/core/testing';

import { ComptesGenerauxService } from './comptes-generaux.service';
import { AppModule } from '../app.module';

describe('ComptesGenerauxService', () => {
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
    const service: ComptesGenerauxService = TestBed.get(ComptesGenerauxService);
    expect(service).toBeTruthy();
  });
});
