import { Role } from './role.model';

export class User {

    constructor(public id?: number,
                public username?: string,
                public password?: string,
                public role?: Role) {}
}
