import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { errorMessages } from '../validators/errorMessages';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UsersService } from '../services/users.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.css']
})
export class MessagesDialogComponent implements OnInit {

  messageForm: FormGroup;
  errors = errorMessages;
  messagesList: Message[];
  sub: Subscription;
  subUser: Subscription;
  user = new User();
  destinataires = ['DIRECTION', 'FINANCE', 'LOGISTIQUE', 'COMMERCE'];
  textInit: string;
  destinataireInit: string;
  isNotUpdate = true;

  constructor(private dialogRef: MatDialogRef<MessagesDialogComponent>,
              private messagesService: MessagesService,
              private formBuilder: FormBuilder,
              private usersService: UsersService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getUser();
    this.sub = this.messagesService.datas$.subscribe(messages => {
      this.messagesList = messages;
      this.getMessages();
      if (this.messagesList) {
        this.initForm(null, null);
      }
    });
  }

  getUser() {
    this.subUser = this.usersService.datas$.subscribe(users => {
      if (users) {
        const username = this.getUsername();
        this.user = users.find(user => user.username === username);
      } else {
        this.usersService.publishDatas().subscribe();
      }
    });
  }

  getUsername(): string {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      return decodedToken.sub;
    }
    return '';
  }

  getMessages() {
    if (!this.messagesList) {
      this.messagesService.publishDatas().subscribe();
    }
  }

  initForm(textInit: string, destinataireInit: string) {
    this.messageForm = this.formBuilder.group({
      text: [textInit, [
        Validators.required,
        Validators.maxLength(100)]
      ],
      destinataire: [destinataireInit, Validators.required]
    });
  }

  createMessage(message: Message) {
    console.log(message);
    this.messagesService.create(message).subscribe(() => {
      // pop-up succes
      this.snackBar.open('Message créé', 'SUCCES', {
        duration: 2000
      });
      this.dialogRef.close();
    },
    error => {
      // pop-up fail
      this.snackBar.open('Erreur de création', 'ECHEC', {
        duration: 2000
      });
    });
  }

  updateMessage(message: Message) {
    console.log(message);
    this.messagesService.update(message).subscribe(() => {
      // pop-up succes
      this.snackBar.open('Message modifié', 'SUCCES', {
        duration: 2000
      });
      this.dialogRef.close();
    },
    error => {
      // pop-up fail
      this.snackBar.open('Erreur de modification', 'ECHEC', {
        duration: 2000
      });
    });
  }

  onSubmit() {
    if (this.isNotUpdate) {
      const message = new Message(null, this.messageForm.value.text, new Date(), this.messageForm.value.destinataire, this.user);
      this.createMessage(message);
    } else {
      const message = this.messagesList[this.messagesList.length - 1];
      message.date = new Date();
      message.texte = this.messageForm.value.text;
      message.destinataire = this.messageForm.value.destinataire;
      this.updateMessage(message);
    }
  }

  onUpdate() {
    if (this.messagesList.length > 0) {
      this.isNotUpdate = false;
      const text = this.messagesList[this.messagesList.length - 1].texte;
      const dest = this.messagesList[this.messagesList.length - 1].destinataire;
      this.initForm(text, dest);
    }
  }

  onDelete() {
    if (this.messagesList.length > 0) {
      const idMessage = this.messagesList[this.messagesList.length - 1].id;
      this.messagesService.delete(idMessage).subscribe(() => {
        // pop-up succes
        this.snackBar.open('Message supprimé', 'SUCCES', {
          duration: 2000
        });
      },
      error => {
        // pop-up fail
        this.snackBar.open('Erreur de suppression', 'ECHEC', {
          duration: 2000
        });
      });
    }
  }

}
