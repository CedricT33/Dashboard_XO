import { CompteTiers } from './compteTiers.model';
import { CompteGeneral } from './compteGeneral.model';

export class EcritureComptable {

    constructor(public id: number,
                public echeance: Date,
                public montant: number,
                public sens: number,
                public compteTiers: CompteTiers,
                public compteGeneral: CompteGeneral) {}
}
