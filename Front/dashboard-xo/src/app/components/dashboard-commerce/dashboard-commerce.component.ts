import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard-commerce',
  templateUrl: './dashboard-commerce.component.html',
  styleUrls: ['./dashboard-commerce.component.css']
})
export class DashboardCommerceComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.changeTitleDashboard('commerce');
  }

}
