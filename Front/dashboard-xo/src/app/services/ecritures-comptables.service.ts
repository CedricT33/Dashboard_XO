import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EcritureComptable } from '../models/ecritureComptable.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcrituresComptableService {

  private availableEcrituresComptable: EcritureComptable[];
  ecrituresComptable$: BehaviorSubject<EcritureComptable[]> = new BehaviorSubject(this.availableEcrituresComptable);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves all employees from API (back).
   */
  private getEcrituresComptable(): Observable<EcritureComptable[]> {
    return this.httpClient.get<EcritureComptable[]>(environment.apiUrl + 'ecriture');
  }

  /**
   * Function that fills the list of employees in the application.
   */
  public publishEcrituresComptable() {
    this.getEcrituresComptable().subscribe(
        ecrituresComptable => {
        this.availableEcrituresComptable = ecrituresComptable;
        this.ecrituresComptable$.next(this.availableEcrituresComptable);
      }
    );
  }
}
