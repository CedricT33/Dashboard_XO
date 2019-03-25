import { Injectable } from '@angular/core';
import { Objectif } from '../models/objectif.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class ObjectifsService {

  private availableObjectifs: Objectif[];
  objectifs$: BehaviorSubject<Objectif[]> = new BehaviorSubject(this.availableObjectifs);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * Function that retrieves all goals from API (back).
   */
  private getObjectifs(): Observable<Objectif[]> {
    return this.httpClient.get<Objectif[]>(environment.apiUrl + 'objectif');
  }

  /**
   * Function that fills the list of goals in the application.
   */
  public publishObjectifs() {
    this.getObjectifs().subscribe(
        objectifs => {
        this.availableObjectifs = objectifs;
        this.objectifs$.next(this.availableObjectifs);
        console.log(this.availableObjectifs);
      }
    );
  }

  /**
   * Function to create a new goal.
   * It update the goal list in the application.
   * @param newObjectif the goal to create.
   */
  public createObjectif(newObjectif: Objectif) {
    this.httpClient.post<Objectif>(environment.apiUrl + 'objectif', newObjectif).subscribe(
      nouvelObjectif => {
        this.availableObjectifs.push(nouvelObjectif);
        this.objectifs$.next(this.availableObjectifs);
      }
    );
  }

  /**
   * Function to update a goal.
   * @param objectif the goal to update.
   */
  public updateObjectif(objectif: Objectif) {
    this.httpClient.put<Objectif>(environment.apiUrl + 'objectif', objectif).subscribe(
      updatedObjectif => {
        this.availableObjectifs.splice(this.availableObjectifs.indexOf(objectif), 1, objectif);
        this.objectifs$.next(this.availableObjectifs);
      }
    );
  }

  /**
   * Function to delete a goal.
   * @param id the id of the goal to delete.
   */
  public deleteObjectifs(id: number) {
    this.httpClient.delete<Objectif>(environment.apiUrl + 'objectif/' + id).subscribe(
      deleteObjectifs => {
        this.availableObjectifs.splice(this.availableObjectifs.indexOf(this.availableObjectifs.find(objectif => objectif.id === id)), 1);
        this.objectifs$.next(this.availableObjectifs);
        // pop-up
        this.snackBar.open('Objectif supprimé', 'SUCCES', {
          duration: 2000,
        });
      }
    );
  }
}
