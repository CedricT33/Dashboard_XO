import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {

  messagesList: Message[];
  sub: Subscription;
  isAdmin: boolean;
  isCommerce: boolean;
  isFinance: boolean;
  isDirection: boolean;
  isLogistic: boolean;

  constructor(private messagesService: MessagesService, private loginService: LoginService) {}

  ngOnInit() {
    this.sub = this.messagesService.datas$.subscribe(messages => {
      this.messagesList = messages;
      this.getMessages();
    });
    this.loginService.userRole.subscribe(userRole => {
      this.isAdmin = userRole.includes('ROLE_ADMIN');
      this.isCommerce = userRole.includes('ROLE_COMMERCE');
      this.isFinance = userRole.includes('ROLE_FINANCE');
      this.isDirection = userRole.includes('ROLE_DIRECTION');
      this.isLogistic = userRole.includes('ROLE_LOGISTIQUE');
    });
  }

  getMessages() {
    if (!this.messagesList) {
      this.messagesService.publishDatas().subscribe();
    }
  }

  changeTitle(title: string) {
    this.loginService.changeTitleDashboard(title);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
