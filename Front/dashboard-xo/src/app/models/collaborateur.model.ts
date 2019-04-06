import { ObjectData } from './objectData.model';

export class Collaborateur extends ObjectData {

    constructor(public id: number,
                public nom: string,
                public prenom: string,
                public numero: number) {
                    super(id);
                }
}
