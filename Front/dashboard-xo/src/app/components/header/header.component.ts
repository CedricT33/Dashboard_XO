import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DeconnexionDialogComponent } from '../deconnexion-dialog/deconnexion-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titreDashboard: string;
  isAdmin: boolean;
  isConnected: boolean;

  constructor(private loginService: LoginService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loginService.userRole.subscribe(userRole => {
      this.isAdmin = userRole.includes('ROLE_ADMIN');
      this.isConnected = userRole.length > 0;
    });
    this.loginService.titleDashboard.subscribe(title => {
      this.titreDashboard = title;
    });
  }

  changeTitle(title: string) {
    this.loginService.changeTitleDashboard(title);
  }

  openDialog(): void {
    this.dialog.open(DeconnexionDialogComponent, {
      width: '50vw',
      data: {}
    });
  }

}
