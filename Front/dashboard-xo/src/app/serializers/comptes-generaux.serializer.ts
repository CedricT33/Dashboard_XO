import { CompteGeneral } from '../models/compteGeneral.model';

export class ComptesGenerauxSerializer {

    fromJson(json: any): CompteGeneral {

        const id = 'id';
        const intitule = 'nbreColis';
        const numero = 'date';

        return new CompteGeneral(
            json[id],
            json[intitule],
            json[numero]
        );
    }
}
