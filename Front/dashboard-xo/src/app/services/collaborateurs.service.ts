import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collaborateur } from '../models/collaborateur.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaborateursService {

  private availableCollaborateurs: Collaborateur[];
  collaborateurs$: BehaviorSubject<Collaborateur[]> = new BehaviorSubject(this.availableCollaborateurs);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves all employees from API (back).
   */
  private getCollaborateurs(): Observable<Collaborateur[]> {
    return this.httpClient.get<Collaborateur[]>(environment.apiUrl + 'collaborateur');
  }

  /**
   * Function that fills the list of employees in the application.
   */
  public publishCollaborateurs() {
    this.getCollaborateurs().subscribe(
        collaborateurs => {
        this.availableCollaborateurs = collaborateurs;
        this.collaborateurs$.next(this.availableCollaborateurs);
      }
    );
  }
}
