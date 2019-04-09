import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompteGeneral } from '../models/compteGeneral.model';
import { DatasService } from './datas.service';
import { CompteGeneralSerializer } from '../serializers/compte-general.serializer';

@Injectable({
  providedIn: 'root'
})
export class ComptesGenerauxService extends DatasService<CompteGeneral> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'compteg', new CompteGeneralSerializer());
  }
}
