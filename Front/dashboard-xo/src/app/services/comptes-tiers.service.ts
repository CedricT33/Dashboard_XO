import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompteTiers } from '../models/compteTiers.model';
import { DatasService } from './datas.service';
import { CompteTiersSerializer } from '../serializers/compte-tiers.serializer';

@Injectable({
  providedIn: 'root'
})
export class ComptesTiersService extends DatasService<CompteTiers> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'comptet', new CompteTiersSerializer());
  }
}
