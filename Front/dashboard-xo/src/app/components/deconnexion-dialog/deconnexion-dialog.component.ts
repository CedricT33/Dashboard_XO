import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deconnexion-dialog',
  templateUrl: './deconnexion-dialog.component.html',
  styleUrls: ['./deconnexion-dialog.component.css']
})
export class DeconnexionDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeconnexionDialogComponent>,
              private loginService: LoginService) { }

  onSignOut() {
    this.loginService.signOut();
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }

}
