import { async, TestBed } from '@angular/core/testing';

import { EcrituresComptablesService } from './ecritures-comptables.service';
import { AppModule } from '../app.module';

describe('EcrituresComptablesService', () => {
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
    const service: EcrituresComptablesService = TestBed.get(EcrituresComptablesService);
    expect(service).toBeTruthy();
  });
});
