import { async, TestBed } from '@angular/core/testing';

import { ComptesTiersService } from './comptes-tiers.service';
import { AppModule } from '../app.module';

describe('ComptesTiersService', () => {
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
    const service: ComptesTiersService = TestBed.get(ComptesTiersService);
    expect(service).toBeTruthy();
  });
});
