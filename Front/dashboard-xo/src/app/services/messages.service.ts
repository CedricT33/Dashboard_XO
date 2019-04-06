import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { HttpClient } from '@angular/common/http';
import { DatasService } from './datas.service';
import { MessageSerializer } from '../serializers/message.serializer';


@Injectable({
  providedIn: 'root'
})
export class MessagesService extends DatasService<Message> {

  constructor( httpClient: HttpClient) {
    super(httpClient, 'message', new MessageSerializer());
  }
}
