import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocLigne } from '../models/docLigne.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsLigneService {

  private availableDocsLigne: DocLigne[];
  docsLigne$: BehaviorSubject<DocLigne[]> = new BehaviorSubject(this.availableDocsLigne);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves all documents from API (back).
   */
  private getDocsLigne(): Observable<DocLigne[]> {
    return this.httpClient.get<DocLigne[]>(environment.apiUrl + 'docligne');
  }

  /**
   * Function that fills the list of documents in the application.
   */
  public publishDocsLigne() {
    this.getDocsLigne().subscribe(
        docsLigne => {
        this.availableDocsLigne = docsLigne;
        this.docsLigne$.next(this.availableDocsLigne);
      }
    );
  }
}
