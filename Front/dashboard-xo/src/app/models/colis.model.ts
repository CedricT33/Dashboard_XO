import { User } from './user.model';
import { ObjectData } from './objectData.model';

export class Colis extends ObjectData {

    constructor(public id: number,
                public nbreColis: number,
                public date: Date,
                public user: User) {
                    super(id);
                }
}
