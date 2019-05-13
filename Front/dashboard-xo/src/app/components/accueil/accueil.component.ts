import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MessagesDialogComponent } from 'src/app/components/messages-dialog/messages-dialog.component';
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe';
declare var M: any;

@AutoUnsubscribe()
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {

  isAdmin: boolean;
  isCommerce: boolean;
  isFinance: boolean;
  isDirection: boolean;
  isLogistic: boolean;
  bubble: any;

  messagesList: Message[];

  sub: Subscription;

  constructor(private messagesService: MessagesService,
              private loginService: LoginService,
              private dialog: MatDialog) {}

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

  getMessages(): void {
    if (this.messagesList) {
      this.openBubble();
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  /**
   * Si il n'y a pas de message l'info-bulle s'affiche.
   */
  openBubble(): void {
    if (this.messagesList.length === 0) {
      setTimeout(() => {
      const elem = document.querySelector('.tap-target');
      this.bubble = M.TapTarget.init(elem);
      this.bubble.open();
    }, 1000);
    }
  }

  changeTitle(title: string) {
    this.loginService.changeTitleDashboard(title);
  }

  openDialog(): void {
    this.dialog.open(MessagesDialogComponent, {
      width: '80vw',
      data: {}
    });
  }

  ngOnDestroy() {}

}
