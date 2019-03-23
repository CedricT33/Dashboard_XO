import { Collaborateur } from './collaborateur.model';
import { CompteTiers } from './compteTiers.model';

export class Document {

    constructor(public id: number,
                public piece: string,
                public date: DataCue,
                public totalHT: number,
                public collaborateur: Collaborateur,
                public compteTiers: CompteTiers) {}
}
