import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDialogComponent } from './messages-dialog.component';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

describe('MessagesDialogComponent', () => {
  let component: MessagesDialogComponent;
  let fixture: ComponentFixture<MessagesDialogComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesDialogComponent);
    component = fixture.componentInstance;
    component.messageForm = formBuilder.group({
      text: ['', [
        Validators.required,
        Validators.maxLength(100)]
      ],
      destinataire: ['', Validators.required]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
