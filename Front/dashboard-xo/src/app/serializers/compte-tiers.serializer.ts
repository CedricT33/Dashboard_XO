import { CompteTiers } from '../models/compteTiers.model';

export class CompteTiersSerializer {

    fromJson(json: any): CompteTiers {

        const id = 'id';
        const intitule = 'intitule';
        const numeroPayeur = 'numeroPayeur';
        const numero = 'numero';
        const adresse = 'adresse';
        const codePostal = 'codePostal';
        const ville = 'ville';
        const pays = 'pays';

        return new CompteTiers(
            json[id],
            json[intitule],
            json[numeroPayeur],
            json[numero],
            json[adresse],
            json[codePostal],
            json[ville],
            json[pays]
        );
    }
}
