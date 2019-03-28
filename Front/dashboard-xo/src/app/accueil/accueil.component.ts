import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  messagesList: BehaviorSubject<Message[]>;

  constructor(private messagesService: MessagesService) {}

  ngOnInit() {
    this.messagesList = this.messagesService.messages$;
  }

}
