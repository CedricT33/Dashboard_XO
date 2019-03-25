import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private availableMessages: Message[];
  messages$: BehaviorSubject<Message[]> = new BehaviorSubject(this.availableMessages);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * Function that retrieves all messages from API (back).
   */
  private getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(environment.apiUrl + 'message');
  }

  /**
   * Function that fills the list of messages in the application.
   */
  public publishMessages() {
    this.getMessages().subscribe(
        messages => {
        this.availableMessages = messages;
        this.messages$.next(this.availableMessages);
        console.log(this.availableMessages);
      }
    );
  }

  /**
   * Function to create a new message.
   * It update the message list in the application.
   * @param newMessage the message to create.
   */
  public createMessage(newMessage: Message) {
    this.httpClient.post<Message>(environment.apiUrl + 'message', newMessage).subscribe(
      nouvelMessage => {
        this.availableMessages.push(nouvelMessage);
        this.messages$.next(this.availableMessages);
      }
    );
  }

  /**
   * Function to update a message.
   * @param message the message to update.
   */
  public updateMessage(message: Message) {
    this.httpClient.put<Message>(environment.apiUrl + 'message', message).subscribe(
      updatedMessage => {
        this.availableMessages.splice(this.availableMessages.indexOf(message), 1, message);
        this.messages$.next(this.availableMessages);
      }
    );
  }

  /**
   * Function to delete a message.
   * @param id the id of the massage to delete.
   */
  public deleteMessage(id: number) {
    this.httpClient.delete<Message>(environment.apiUrl + 'message/' + id).subscribe(
      deleteMessage => {
        this.availableMessages.splice(this.availableMessages.indexOf(this.availableMessages.find(message => message.id === id)), 1);
        this.messages$.next(this.availableMessages);
        // pop-up
        this.snackBar.open('Message supprimé', 'SUCCES', {
          duration: 2000,
        });
      }
    );
  }
}
