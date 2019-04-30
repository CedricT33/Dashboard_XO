import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnexionDialogComponent } from './deconnexion-dialog.component';

describe('DeconnexionDialogComponent', () => {
  let component: DeconnexionDialogComponent;
  let fixture: ComponentFixture<DeconnexionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeconnexionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconnexionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
