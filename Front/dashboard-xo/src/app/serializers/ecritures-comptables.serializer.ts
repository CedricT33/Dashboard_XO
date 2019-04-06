import { EcritureComptable } from '../models/ecritureComptable.model';

export class EcrituresComptablesSerializer {

    fromJson(json: any): EcritureComptable {

        const id = 'id';
        const echeance = 'echeance';
        const montant = 'montant';
        const sens = 'sens';
        const compteTiers = 'compteT';
        const compteGeneral = 'compteG';

        return new EcritureComptable(
            json[id],
            json[echeance],
            json[montant],
            json[sens],
            json[compteTiers],
            json[compteGeneral]
        );
    }
}
