import { Objectif } from '../models/objectif.model';

export class ObjectifsSerializer {

    fromJson(json: any): Objectif {

        const id = 'id';
        const intitule = 'intitule';
        const date = 'date';
        const chiffre = 'chiffre';
        const user = 'user';

        return new Objectif(
            json[id],
            json[intitule],
            new Date(json[date]),
            json[chiffre],
            json[user]
        );
    }
}
