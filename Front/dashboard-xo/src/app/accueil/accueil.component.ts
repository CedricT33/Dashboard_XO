import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  messagesList: BehaviorSubject<Message[]>;
  isAdmin: boolean;
  isCommerce: boolean;
  isFinance: boolean;
  isDirection: boolean;
  isLogistic: boolean;

  constructor(private messagesService: MessagesService, private loginService: LoginService) {}

  ngOnInit() {
    this.messagesList = this.messagesService.messages$;
    this.loginService.userRole.subscribe(userRole => {
      this.isAdmin = userRole.includes('ROLE_ADMIN');
      this.isCommerce = userRole.includes('ROLE_COMMERCE');
      this.isFinance = userRole.includes('ROLE_FINANCE');
      this.isDirection = userRole.includes('ROLE_DIRECTION');
      this.isLogistic = userRole.includes('ROLE_LOGISTIQUE');
    });
  }

  changeTitle(title: string) {
    this.loginService.changeTitleDashboard(title);
  }

}
