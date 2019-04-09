import { Collaborateur } from '../models/collaborateur.model';

export class CollaborateurSerializer {

    fromJson(json: any): Collaborateur {

        const id = 'id';
        const nom = 'nom';
        const prenom = 'prenom';
        const numero = 'numero';

        return new Collaborateur(
            json[id],
            json[nom],
            json[prenom],
            json[numero]
        );
    }
}
