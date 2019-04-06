import { DocEntete } from '../models/docEntete.model';

export class DocsEnteteSerializer {

    fromJson(json: any): DocEntete {

        const id = 'id';
        const piece = 'piece';
        const date = 'date';
        const totalHT = 'totalHT';
        const collaborateur = 'collaborateur';
        const compteTiers = 'compteT';

        return new DocEntete(
            json[id],
            json[piece],
            new Date(json[date]),
            json[totalHT],
            json[collaborateur],
            json[compteTiers]
        );
    }
}
