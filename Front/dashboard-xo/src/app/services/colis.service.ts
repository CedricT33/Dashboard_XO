import { Injectable } from '@angular/core';
import { Colis } from '../models/colis.model';
import { HttpClient } from '@angular/common/http';
import { DatasService } from './datas.service';
import { ColisSerializer } from '../serializers/colis.serializer';


@Injectable({
  providedIn: 'root'
})
export class ColisService extends DatasService<Colis> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'colis', new ColisSerializer());
  }
}
