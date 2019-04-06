import { ObjectData } from './objectData.model';

export class CompteGeneral extends ObjectData {

    constructor(public id: number,
                public intitule: string,
                public numero: string) {
                    super(id);
                }
}
