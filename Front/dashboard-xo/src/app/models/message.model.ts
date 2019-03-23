import { User } from './user.model';

export class Message {

    constructor(public id: number,
                public texte: string,
                public date: Date,
                public destinataire: string,
                public user: User) {}
}
