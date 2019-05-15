import { async, TestBed } from '@angular/core/testing';

import { ObjectifsService } from './objectifs.service';
import { AppModule } from '../app.module';

describe('ObjectifsService', () => {
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
    const service: ObjectifsService = TestBed.get(ObjectifsService);
    expect(service).toBeTruthy();
  });
});
