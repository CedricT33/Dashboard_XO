import { ObjectData } from './objectData.model';
import { CompteGeneral } from './compteGeneral.model';

export class CompteTiers extends ObjectData {

    constructor(public id: number,
                public intitule: string,
                public numeroPayeur: string,
                public numero: string,
                public adresse: string,
                public codePostal: string,
                public ville: string,
                public pays: string,
                public compteG: CompteGeneral) {
                    super(id);
                }
}
