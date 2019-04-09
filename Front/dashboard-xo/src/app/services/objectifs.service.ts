import { Injectable } from '@angular/core';
import { Objectif } from '../models/objectif.model';
import { HttpClient } from '@angular/common/http';
import { DatasService } from './datas.service';
import { ObjectifSerializer } from '../serializers/objectif.serializer';


@Injectable({
  providedIn: 'root'
})
export class ObjectifsService extends DatasService<Objectif> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'objectif', new ObjectifSerializer());
  }
}
