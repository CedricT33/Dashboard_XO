import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CompteTiers } from '../models/compteTiers.model';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves a JSON from API.
   */
  public getCoordinates(client: CompteTiers): Observable<any> {
    const adresse: string = client.adresse + '+' + client.codePostal + '+' + client.ville + '+' + client.pays;
    console.log('GET datas Coordinates');
    return this.httpClient.get('https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&limit=1');
  }
}
