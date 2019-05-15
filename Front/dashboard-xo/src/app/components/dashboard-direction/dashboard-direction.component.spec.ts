import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDirectionComponent } from './dashboard-direction.component';
import { AppModule } from 'src/app/app.module';

describe('DashboardDirectionComponent', () => {
  let component: DashboardDirectionComponent;
  let fixture: ComponentFixture<DashboardDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
