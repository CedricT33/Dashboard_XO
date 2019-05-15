import { async, TestBed } from '@angular/core/testing';

import { CollaborateursService } from './collaborateurs.service';
import { AppModule } from '../app.module';

describe('CollaborateursService', () => {
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
    const service: CollaborateursService = TestBed.get(CollaborateursService);
    expect(service).toBeTruthy();
  });
});
