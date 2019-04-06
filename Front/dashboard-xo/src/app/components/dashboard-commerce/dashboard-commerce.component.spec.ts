import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCommerceComponent } from './dashboard-commerce.component';

describe('DashboardCommerceComponent', () => {
  let component: DashboardCommerceComponent;
  let fixture: ComponentFixture<DashboardCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
