import { ObjectData } from './objectData.model';

export class Role extends ObjectData {

    constructor(public id?: number,
                public role?: string) {
                    super(id);
                }
}
