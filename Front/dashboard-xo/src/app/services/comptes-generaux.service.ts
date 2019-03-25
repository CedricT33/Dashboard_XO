import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompteGeneral } from '../models/compteGeneral.model';

@Injectable({
  providedIn: 'root'
})
export class ComptesGenerauxService {

  private availableComptesGeneraux: CompteGeneral[];
  comptesGeneraux$: BehaviorSubject<CompteGeneral[]> = new BehaviorSubject(this.availableComptesGeneraux);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves all general accounts from API (back).
   */
  private getComptesGeneraux(): Observable<CompteGeneral[]> {
    return this.httpClient.get<CompteGeneral[]>(environment.apiUrl + 'compteg');
  }

  /**
   * Function that fills the list of general accounts in the application.
   */
  public publishComptesGeneraux() {
    this.getComptesGeneraux().subscribe(
        comptesGeneraux => {
        this.availableComptesGeneraux = comptesGeneraux;
        this.comptesGeneraux$.next(this.availableComptesGeneraux);
        console.log(this.availableComptesGeneraux);
      }
    );
  }
}
