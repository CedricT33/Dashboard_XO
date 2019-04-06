import { User } from './user.model';
import { ObjectData } from './objectData.model';

export class Objectif extends ObjectData {

    constructor(public id: number,
                public intitule: string,
                public date: Date,
                public chiffre: number,
                public user: User) {
                    super(id);
                }
}
