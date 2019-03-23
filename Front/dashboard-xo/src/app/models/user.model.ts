import { Role } from './role.model';

export class User {

    constructor(public id: number,
                public usernme: string,
                public password: string,
                public role: Role) {}
}
