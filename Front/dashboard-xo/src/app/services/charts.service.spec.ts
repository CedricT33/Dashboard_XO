import { async, TestBed } from '@angular/core/testing';

import { ChartsService } from './charts.service';
import { AppModule } from '../app.module';

describe('ChartsService', () => {
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
    const service: ChartsService = TestBed.get(ChartsService);
    expect(service).toBeTruthy();
  });
});
