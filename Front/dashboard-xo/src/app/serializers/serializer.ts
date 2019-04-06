import { ObjectData } from '../models/objectData.model';

export interface Serializer {
    fromJson(json: any): ObjectData;
}
