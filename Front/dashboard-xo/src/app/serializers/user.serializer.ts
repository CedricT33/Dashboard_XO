import { User } from '../models/user.model';

export class UserSerializer {

    fromJson(json: any): User {

        const id = 'id';
        const username = 'username';
        const role = 'role';

        return new User(
            json[id],
            json[username],
            null,
            json[role]
        );
    }
}
