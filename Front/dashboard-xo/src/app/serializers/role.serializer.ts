import { Role } from '../models/role.model';

export class RoleSerializer {

    fromJson(json: any): Role {

        const id = 'id';
        const role = 'role';

        return new Role(
            json[id],
            json[role]
        );
    }
}
