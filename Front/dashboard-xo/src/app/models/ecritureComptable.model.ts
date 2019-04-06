import { CompteTiers } from './compteTiers.model';
import { CompteGeneral } from './compteGeneral.model';
import { ObjectData } from './objectData.model';

export class EcritureComptable extends ObjectData {

    constructor(public id: number,
                public echeance: Date,
                public montant: number,
                public sens: number,
                public compteTiers: CompteTiers,
                public compteGeneral: CompteGeneral) {
                    super(id);
                }
}
