import { User } from './user.model';
import { ObjectData } from './objectData.model';

export class Message extends ObjectData {

    constructor(public id: number,
                public texte: string,
                public date: Date,
                public destinataire: string,
                public user: User) {
                    super(id);
                }
}
