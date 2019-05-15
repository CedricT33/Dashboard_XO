import { async, TestBed } from '@angular/core/testing';

import { DatesService } from './dates.service';
import { AppModule } from '../app.module';

describe('DatesService', () => {
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
    const service: DatesService = TestBed.get(DatesService);
    expect(service).toBeTruthy();
  });
});
