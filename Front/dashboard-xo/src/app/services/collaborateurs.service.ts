import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collaborateur } from '../models/collaborateur.model';
import { DatasService } from './datas.service';
import { CollaborateurSerializer } from '../serializers/collaborateur.serializer';



@Injectable({
  providedIn: 'root'
})
export class CollaborateursService extends DatasService<Collaborateur> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'collaborateur', new CollaborateurSerializer());
  }
}
