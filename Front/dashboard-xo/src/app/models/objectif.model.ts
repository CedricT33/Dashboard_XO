import { User } from './user.model';

export class Objectif {

    constructor(public id: number,
                public intitule: string,
                public date: Date,
                public chiffre: number,
                public user: User) {}
}
