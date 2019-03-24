import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompteTiers } from '../models/compteTiers.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComptesTiersService {

  private availableComptesTiers: CompteTiers[];
  comptesTiers$: BehaviorSubject<CompteTiers[]> = new BehaviorSubject(this.availableComptesTiers);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves all third-party accounts from API (back).
   */
  private getComptesTiers(): Observable<CompteTiers[]> {
    return this.httpClient.get<CompteTiers[]>(environment.apiUrl + 'comptet');
  }

  /**
   * Function that fills the list of third-party accounts in the application.
   */
  public publishComptesTiers() {
    this.getComptesTiers().subscribe(
        comptesTiers => {
        this.availableComptesTiers = comptesTiers;
        this.comptesTiers$.next(this.availableComptesTiers);
      }
    );
  }
}
