import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard-direction',
  templateUrl: './dashboard-direction.component.html',
  styleUrls: ['./dashboard-direction.component.css']
})
export class DashboardDirectionComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.changeTitleDashboard('direction');
  }

}
