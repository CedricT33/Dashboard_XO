import { User } from './user.model';

export class Colis {

    constructor(public id: number,
                public nbreColis: number,
                public date: Date,
                public user: User) {}
}
