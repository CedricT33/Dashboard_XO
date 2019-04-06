import { DocLigne } from '../models/docLigne.model';

export class DocsLigneSerializer {

    fromJson(json: any): DocLigne {

        const id = 'id';
        const montantHT = 'montantHT';
        const dateBC = 'dateBC';
        const dateBL = 'dateBL';
        const collaborateur = 'collaborateur';
        const compteTiers = 'compteT';

        return new DocLigne(
            json[id],
            json[montantHT],
            new Date(json[dateBC]),
            new Date(json[dateBL]),
            json[collaborateur],
            json[compteTiers]
        );
    }
}
