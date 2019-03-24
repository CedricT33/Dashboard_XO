import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocEntete } from '../models/docEntete.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsEnteteService {

  private availableDocsEntete: DocEntete[];
  docsEntete$: BehaviorSubject<DocEntete[]> = new BehaviorSubject(this.availableDocsEntete);

  constructor(private httpClient: HttpClient) {}

  /**
   * Function that retrieves all documents from API (back).
   */
  private getDocsEntete(): Observable<DocEntete[]> {
    return this.httpClient.get<DocEntete[]>(environment.apiUrl + 'docentete');
  }

  /**
   * Function that fills the list of documents in the application.
   */
  public publishDocsEntete() {
    this.getDocsEntete().subscribe(
        docsEntete => {
        this.availableDocsEntete = docsEntete;
        this.docsEntete$.next(this.availableDocsEntete);
      }
    );
  }
}
