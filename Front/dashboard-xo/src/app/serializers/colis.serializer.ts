import { Colis } from '../models/colis.model';

export class ColisSerializer {

    fromJson(json: any): Colis {

        const id = 'id';
        const nbreColis = 'nbreColis';
        const date = 'date';
        const user = 'user';

        return new Colis(
            json[id],
            json[nbreColis],
            new Date(json[date]),
            json[user]
        );
    }
}
