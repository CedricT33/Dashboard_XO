import { Collaborateur } from './collaborateur.model';
import { CompteTiers } from './compteTiers.model';

export class DocLigne {

    constructor(public id: number,
                public montantHT: number,
                public dateBC: Date,
                public dateBL: Date,
                public collaborateur: Collaborateur,
                public compteTiers: CompteTiers) {}
}
