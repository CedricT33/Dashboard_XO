import { async, TestBed } from '@angular/core/testing';

import { RolesService } from './roles.service';
import { AppModule } from '../app.module';

describe('RolesService', () => {
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
    const service: RolesService = TestBed.get(RolesService);
    expect(service).toBeTruthy();
  });
});
