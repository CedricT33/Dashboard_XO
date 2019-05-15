import { async, TestBed } from '@angular/core/testing';

import { ColisService } from './colis.service';
import { AppModule } from '../app.module';

describe('ColisService', () => {
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
    const service: ColisService = TestBed.get(ColisService);
    expect(service).toBeTruthy();
  });
});
