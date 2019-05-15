import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CompteTiers } from '../models/compteTiers.model';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  private pins: any[];
  errors: any[];
  pins$: BehaviorSubject<any[]> = new BehaviorSubject(this.pins);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

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
  public getAllCoordinates(clients: CompteTiers[]): void {
    this.pins = [];
    this.errors = [];
    clients.forEach((client, index) => {
      setTimeout(() => {
        this.getCoordinates(client).subscribe(coord => {
          if (coord.features.length > 0) {
            this.pins.push({latLng: coord.features[0].geometry.coordinates.reverse(), name: client.intitule });
            this.pins$.next(this.pins);
          }
        },
        error => {
          console.log(error);
          if (error.status === 0 && this.errors.length === 0) {
            // pop-up echec de connexion
            this.snackBar.open('Erreur de connexion', 'ECHEC', {
              duration: environment.durationSnackBar,
              panelClass: 'echec'
            });
            this.errors.push(error.status);
          }
        });
      }, 20 * ( index + 1) ); // API max 50 requêtes/s
    });
  }
}
