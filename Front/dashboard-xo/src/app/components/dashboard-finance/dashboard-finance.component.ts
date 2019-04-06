import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard-finance',
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.css']
})
export class DashboardFinanceComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.changeTitleDashboard('finance');
  }

}
