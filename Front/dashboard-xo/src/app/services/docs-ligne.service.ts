import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocLigne } from '../models/docLigne.model';
import { DatasService } from './datas.service';
import { DocsLigneSerializer } from '../serializers/docs-ligne.serializer';

@Injectable({
  providedIn: 'root'
})
export class DocsLigneService extends DatasService<DocLigne> {

  constructor( httpClient: HttpClient) {
    super(httpClient, 'docligne', new DocsLigneSerializer());
  }
}
