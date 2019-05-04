import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'app-dashboard-direction',
  templateUrl: './dashboard-direction.component.html',
  styleUrls: ['./dashboard-direction.component.css']
})
export class DashboardDirectionComponent implements OnInit, OnDestroy {

  @ViewChild('vmap') vmap: ElementRef;

  messagesDirection: Message[];

  listMessages: Message[];

  subMessages: Subscription;

  constructor(private loginService: LoginService,
              private messagesService: MessagesService,
              private router: Router,
              private chartsService: ChartsService) {}

  ngOnInit() {
    this.loginService.changeTitleDashboard('direction');
    // abonnement au behavior subject "datas$" du messagesService.
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    // boucles de rechargement des données à intervalle régulier.
    this.messagesService.reloadDatas(environment.interval, this.router);
    setTimeout(() => this.chartsService.initMapFrance('#vmap')) ;
  }

  /**
   * Récupère les données Messages du back si la liste de messages du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getMessages(): void {
    if (this.listMessages) {
      this.messagesDirection = this.listMessages.filter(m => m.destinataire === 'DIRECTION');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  ngOnDestroy() {
    if (this.subMessages) {
      this.subMessages.unsubscribe();
    }
    this.messagesService.stopReload();
  }

}
