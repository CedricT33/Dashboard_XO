import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { errorMessages } from 'src/app/validators/errorMessages';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  username: string;
  userForm: FormGroup;
  roles: Role[] = [];
  users: User[];
  subRole: Subscription;
  subUser: Subscription;
  isNotUsername = true;
  errors = errorMessages;

  constructor(private formBuilder: FormBuilder,
              private rolesService: RolesService,
              private usersService: UsersService,
              private router: Router,
              private snackBar: MatSnackBar,
              private location: Location) {}

  ngOnInit() {
    this.getRoles();
    this.getUsers();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: [null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        CustomValidators.usernameValidator(this.users)]
      ],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(70)])
      ],
      role: [null, Validators.required]
    });
  }

  getRoles() {
    this.subRole = this.rolesService.datas$.subscribe(roles => {
      this.roles = roles;
      if (!this.roles) {
        this.rolesService.publishDatas().subscribe();
      }
    });
  }

  getUsers() {
    this.subUser = this.usersService.datas$.subscribe(users => {
      this.users = users;
      if (!this.users) {
        this.usersService.publishDatas().subscribe();
      } else {
        this.initForm();
      }
    });
  }

  onSubmit() {
    const user = new User();
    user.id = 22;
    user.username = this.userForm.value.username;
    user.password = this.userForm.value.password;
    user.role = this.userForm.value.role;
    this.usersService.create(user).subscribe(() => {
      // pop-up succes
      this.snackBar.open('Utilisateur créé', 'SUCCES', {
        duration: 2000
      });
    });
    this.router.navigate(['admin']);
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.subRole) {
      this.subRole.unsubscribe();
    }
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }

}
