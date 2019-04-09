import { Role } from './role.model';
import { ObjectData } from './objectData.model';

export class User extends ObjectData {

    constructor(public id?: number,
                public username?: string,
                public password?: string,
                public role?: Role) {
                    super(id);
                }
}
