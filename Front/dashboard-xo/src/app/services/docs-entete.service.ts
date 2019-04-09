import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocEntete } from '../models/docEntete.model';
import { DatasService } from './datas.service';
import { DocEnteteSerializer } from '../serializers/doc-entete.serializer';

@Injectable({
  providedIn: 'root'
})
export class DocsEnteteService extends DatasService<DocEntete> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'docentete', new DocEnteteSerializer());
  }
}
