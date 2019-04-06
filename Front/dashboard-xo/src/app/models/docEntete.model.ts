import { Collaborateur } from './collaborateur.model';
import { CompteTiers } from './compteTiers.model';
import { ObjectData } from './objectData.model';

export class DocEntete extends ObjectData {

    constructor(public id: number,
                public piece: string,
                public date: Date,
                public totalHT: number,
                public collaborateur: Collaborateur,
                public compteTiers: CompteTiers) {
                    super(id);
                }
}
