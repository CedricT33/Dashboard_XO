import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcritureComptable } from '../models/ecritureComptable.model';
import { DatasService } from './datas.service';
import { EcrituresComptablesSerializer } from '../serializers/ecritures-comptables.serializer';

@Injectable({
  providedIn: 'root'
})
export class EcrituresComptablesService extends DatasService<EcritureComptable> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'ecriture', new EcrituresComptablesSerializer());
  }
}
