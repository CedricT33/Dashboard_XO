import { async, TestBed } from '@angular/core/testing';

import { CoordinatesService } from './coordinates.service';
import { AppModule } from '../app.module';

describe('CoordinatesService', () => {
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
    const service: CoordinatesService = TestBed.get(CoordinatesService);
    expect(service).toBeTruthy();
  });
});
