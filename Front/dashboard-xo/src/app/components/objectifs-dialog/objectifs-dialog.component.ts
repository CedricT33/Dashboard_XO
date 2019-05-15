import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { errorMessages } from 'src/app/validators/errorMessages';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ObjectifsService } from 'src/app/services/objectifs.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { Objectif } from 'src/app/models/objectif.model';
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-objectifs-dialog',
  templateUrl: './objectifs-dialog.component.html',
  styleUrls: ['./objectifs-dialog.component.css']
})
export class ObjectifsDialogComponent implements OnInit, OnDestroy {

  objectifForm: FormGroup;
  user = new User();
  errors = errorMessages;

  subUser: Subscription;

  constructor(private dialogRef: MatDialogRef<ObjectifsDialogComponent>,
              private formBuilder: FormBuilder,
              private objectifsService: ObjectifsService,
              private usersService: UsersService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getUser();
    this.initForm();
  }

  getUser(): void {
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

  initForm(): void {
    this.objectifForm = this.formBuilder.group({
      intitule: [null, [Validators.required, Validators.maxLength(50)]],
      objectif: [null, [Validators.required, Validators.max(2000000000), Validators.min(0)]]
    });
  }

  createObjectif(objectif: Objectif): void {
    this.objectifsService.create(objectif).subscribe(() => {
      // pop-up succes
      this.snackBar.open('Objectif ajouté', 'SUCCES', {
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
      const objectif = new Objectif(null, this.objectifForm.value.intitule, new Date(), +this.objectifForm.value.objectif, this.user);
      this.createObjectif(objectif);
  }

  ngOnDestroy() {}

}
