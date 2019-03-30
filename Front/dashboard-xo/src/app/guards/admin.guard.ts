import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginService.loggedIn) {
      this.router.navigate(['login']);
      return false;
    } else if (this.loginService.userRole.getValue().includes('ROLE_ADMIN')) {
      return true;
    }

    return false;
  }
}
