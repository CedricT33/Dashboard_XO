import { Collaborateur } from './collaborateur.model';
import { CompteTiers } from './compteTiers.model';
import { ObjectData } from './objectData.model';

export class DocLigne extends ObjectData {

    constructor(public id: number,
                public montantHT: number,
                public dateBC: Date,
                public dateBL: Date,
                public collaborateur: Collaborateur,
                public compteTiers: CompteTiers) {
                    super(id);
                }
}
