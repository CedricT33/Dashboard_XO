import { Injectable } from '@angular/core';
import { Colis } from '../models/colis.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class ColisService {

  private availableColis: Colis[];
  colis$: BehaviorSubject<Colis[]> = new BehaviorSubject(this.availableColis);

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * Function that retrieves all packets from API (back).
   */
  private getColis(): Observable<Colis[]> {
    return this.httpClient.get<Colis[]>(environment.apiUrl + 'colis');
  }

  /**
   * Function that fills the list of packets in the application.
   */
  public publishColis() {
    this.getColis().subscribe(
        colis => {
        this.availableColis = colis;
        this.colis$.next(this.availableColis);
        console.log(this.availableColis);
      }
    );
  }

  /**
   * Function to create a new packet.
   * It update the packet list in the application.
   * @param newColis the packet to create.
   */
  public createColis(newColis: Colis) {
    this.httpClient.post<Colis>(environment.apiUrl + 'colis', newColis).subscribe(
      nouvelColis => {
        this.availableColis.push(nouvelColis);
        this.colis$.next(this.availableColis);
      }
    );
  }

  /**
   * Function to update a packet.
   * @param colis the packet to update.
   */
  public updateColis(colis: Colis) {
    this.httpClient.put<Colis>(environment.apiUrl + 'colis', colis).subscribe(
      updatedColis => {
        this.availableColis.splice(this.availableColis.indexOf(colis), 1, colis);
        this.colis$.next(this.availableColis);
      }
    );
  }

  /**
   * Function to delete a packet.
   * @param id the id of the packet to delete.
   */
  public deleteColis(id: number) {
    this.httpClient.delete<Colis>(environment.apiUrl + 'colis/' + id).subscribe(
      deleteColis => {
        this.availableColis.splice(this.availableColis.indexOf(this.availableColis.find(colis => colis.id === id)), 1);
        this.colis$.next(this.availableColis);
        // pop-up
        this.snackBar.open('Colis supprimé', 'SUCCES', {
          duration: 2000,
        });
      }
    );
  }
}
