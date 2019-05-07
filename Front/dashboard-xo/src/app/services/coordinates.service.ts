import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CompteTiers } from '../models/compteTiers.model';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  private pins: any[];
  pins$: BehaviorSubject<any[]> = new BehaviorSubject(this.pins);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that get a JSON with coordinates from an adress.
   */
  public getCoordinates(client: CompteTiers): Observable<any> {
    const adresse: string = client.adresse + '+' + client.codePostal + '+' + client.ville + '+' + client.pays;
    console.log('GET datas Coordinates');
    return this.httpClient.get('https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&limit=1');
  }

  /**
   * Function that call the method getCoordinates for each client every 20ms.
   * @param clients List of clients
   */
  public getAllCoordinates(clients: CompteTiers[]) {
    this.pins = [];
    clients.forEach(client => setTimeout(() => {
        this.getCoordinates(client).subscribe(coord => {
          if (coord.features.length > 0) {
            this.pins.push({latLng: coord.features[0].geometry.coordinates.reverse(), name: client.intitule });
            this.pins$.next(this.pins);
          }
        });
      }, 20) // (Max API : 50 requests / s).
    );
  }
}
