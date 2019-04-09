import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  username: string;
  userForm: FormGroup;
  roles: Role[] = [];
  sub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private rolesService: RolesService,
              private usersService: UsersService,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initForm();
    this.getRoles();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      username: [null,  Validators.compose([
        Validators.required, Validators.minLength(0), Validators.maxLength(30)])
      ],
      password: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(70)])
      ],
      role: [null, Validators.required]
    });
  }

  getRoles() {
    this.sub = this.rolesService.datas$.subscribe(roles => {
      this.roles = roles;
      if (!this.roles) {
        this.rolesService.publishDatas().subscribe();
      }
    });
  }

  onSubmit() {
    const user = new User();
    user.id = 22;
    user.username = this.userForm.value.username;
    user.password = this.userForm.value.password;
    user.role = this.userForm.value.role;
    console.log(user);
    this.usersService.create(user).subscribe(() => {
      // pop-up succes
      this.snackBar.open('Utilisateur créé', 'SUCCES', {
        duration: 2000
      });
    });
    this.router.navigate(['admin']);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
