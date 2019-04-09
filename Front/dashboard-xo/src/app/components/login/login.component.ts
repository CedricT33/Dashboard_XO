import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: [null,  Validators.compose([
      Validators.required, Validators.minLength(0), Validators.maxLength(30)])
    ],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(70)])
    ]
  });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.signOut();
  }

  onSubmit() {
    const user = new User();
    user.username = this.loginForm.value.username;
    user.password = this.loginForm.value.password;
    this.loginService.signIn(user);
  }

}
