import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifsDialogComponent } from './objectifs-dialog.component';

describe('ObjectifsDialogComponent', () => {
  let component: ObjectifsDialogComponent;
  let fixture: ComponentFixture<ObjectifsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectifsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectifsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
