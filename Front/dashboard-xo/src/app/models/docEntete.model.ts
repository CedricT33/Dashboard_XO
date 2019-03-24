import { Collaborateur } from './collaborateur.model';
import { CompteTiers } from './compteTiers.model';

export class DocEntete {

    constructor(public id: number,
                public piece: string,
                public date: Date,
                public totalHT: number,
                public collaborateur: Collaborateur,
                public compteTiers: CompteTiers) {}
}
