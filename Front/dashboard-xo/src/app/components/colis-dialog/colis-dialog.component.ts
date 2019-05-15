import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColisService } from 'src/app/services/colis.service';
import { Colis } from 'src/app/models/colis.model';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { errorMessages } from 'src/app/validators/errorMessages';
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-colis-dialog',
  templateUrl: './colis-dialog.component.html',
  styleUrls: ['./colis-dialog.component.css']
})
export class ColisDialogComponent implements OnInit, OnDestroy {

  colisForm: FormGroup;
  user = new User();
  errors = errorMessages;

  subUser: Subscription;

  constructor(private dialogRef: MatDialogRef<ColisDialogComponent>,
              private formBuilder: FormBuilder,
              private colisService: ColisService,
              private usersService: UsersService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUser();
    this.initForm();
  }

  getUser() {
    this.subUser = this.usersService.datas$.subscribe(users => {
      if (users) {
        const username = this.getUsername();
        this.user = users.find(user => user.username === username);
      } else {
        this.usersService.publishDatas().subscribe(() => {}, error => {
          // pop-up echec connexion et fermeture pop-in
          this.snackBar.open('Problème de connexion', 'ECHEC', {
            duration: environment.durationSnackBar,
            panelClass: 'echec'
          });
          this.dialogRef.close();
        });
      }
    });
  }

  getUsername(): string {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      return decodedToken.sub;
    }
    return '';
  }

  initForm() {
    this.colisForm = this.formBuilder.group({
      colis: [null, [Validators.required, Validators.max(100), Validators.min(-100)]]
    });
  }

  createColis(colis: Colis) {
    this.colisService.create(colis).subscribe(() => {
      // pop-up succes
      this.snackBar.open('Colis ajoutés', 'SUCCES', {
        duration: environment.durationSnackBar
      });
      this.dialogRef.close();
    },
    error => {
      // pop-up fail
      this.snackBar.open('Erreur d\'enregistrement', 'ECHEC', {
        duration: environment.durationSnackBar,
        panelClass: 'echec'
      });
    });
  }

  onSubmit() {
      const colis = new Colis(null, +this.colisForm.value.colis, new Date(), this.user);
      this.createColis(colis);
  }

  ngOnDestroy() {}

}
