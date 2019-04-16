import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisDialogComponent } from './colis-dialog.component';

describe('ColisDialogComponent', () => {
  let component: ColisDialogComponent;
  let fixture: ComponentFixture<ColisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
