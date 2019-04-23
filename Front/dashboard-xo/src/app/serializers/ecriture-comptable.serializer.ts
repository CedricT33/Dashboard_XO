import { EcritureComptable } from '../models/ecritureComptable.model';

export class EcritureComptableSerializer {

    fromJson(json: any): EcritureComptable {

        const id = 'id';
        const echeance = 'echeance';
        const montant = 'montant';
        const sens = 'sens';
        const compteTiers = 'compteT';
        const compteGeneral = 'compteG';

        return new EcritureComptable(
            json[id],
            new Date(json[echeance]),
            json[montant],
            json[sens],
            json[compteTiers],
            json[compteGeneral]
        );
    }
}
