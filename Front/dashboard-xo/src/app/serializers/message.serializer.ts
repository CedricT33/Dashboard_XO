import { Message } from '../models/message.model';

export class MessageSerializer {

    fromJson(json: any): Message {

        const id = 'id';
        const texte = 'texte';
        const date = 'date';
        const destinataire = 'destinataire';
        const user = 'user';

        return new Message(
            json[id],
            json[texte],
            new Date(json[date]),
            json[destinataire],
            json[user]
        );
    }
}
