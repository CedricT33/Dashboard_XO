import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../serializers/serializer';
import { ObjectData } from '../models/objectData.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DatasService<T extends ObjectData> {

  private availableDatas: T[];
  datas$: BehaviorSubject<T[]> = new BehaviorSubject(this.availableDatas);
  timer: any;

  constructor(private httpClient: HttpClient,
              private endPoint: string,
              private serializer: Serializer) {}

  /**
   * Function that retrieves all datas from API (back).
   */
  public getAllDatas(): Observable<T[]> {
    console.log('GET datas ' + this.endPoint);
    return this.httpClient.get<T[]>(environment.apiUrl + this.endPoint)
                                    .pipe(map((datas: any) => datas.map((data: any) => this.serializer.fromJson(data))));
  }

  /**
   * Function that fills the list of datas in the application.
   */
  public publishDatas(): Observable<any> {
    return this.getAllDatas().pipe(map(datas => {
      this.availableDatas = datas;
      this.datas$.next(this.availableDatas);
    }));
  }

  /**
   * Function to create a new data.
   * It update the data list in the application.
   * @param object the object to create.
   */
  public create(object: T): Observable<any> {
    return this.httpClient.post<T>(environment.apiUrl + this.endPoint, object)
                          .pipe(map((datas: any) => {
                            const dataObject = this.serializer.fromJson(datas);
                            this.availableDatas.push(dataObject);
                            this.datas$.next(this.availableDatas);
                            console.log('POST datas ' + this.endPoint);
                          }));
  }

  /**
   * Function to update a data.
   * @param object the object to update.
   */
  public update(object: T): Observable<any> {
    return this.httpClient.put<T>(environment.apiUrl + this.endPoint, object)
                          .pipe(map((datas: any) => {
                            const dataObject = this.serializer.fromJson(datas);
                            this.availableDatas.splice(this.availableDatas.indexOf(object), 1, dataObject);
                            this.datas$.next(this.availableDatas);
                            console.log('PUT datas ' + this.endPoint);
                          }));
  }

  /**
   * Function to delete a data.
   * @param id the id of the object to delete.
   */
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<T>(environment.apiUrl + this.endPoint + '/' + id)
                          .pipe(map((datas: any) => {
                            this.availableDatas.splice(this.availableDatas.indexOf(this.availableDatas.find(data => data.id === id)), 1);
                            this.datas$.next(this.availableDatas);
                            console.log('DELETE datas ' + this.endPoint);
                          }));
  }

  /**
   * Function to reload datas from the API (back).
   * @param interval interbal in milliseconds.
   */
  public reloadDatas(interval: number, router: Router) {
    this.timer = setInterval(() => {
      if (this.isLoggedIn()) {
        this.getAllDatas().subscribe(datas => {
          this.availableDatas = datas;
          this.datas$.next(this.availableDatas);
        });
      } else {
        router.navigate(['login']);
      }
    }, interval);
  }

  /**
   * Function to check if the user is connected.
   */
  private isLoggedIn(): boolean {
    let exp: number;
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      exp = decodedToken.exp;
    }
    return (sessionStorage.getItem(environment.accessToken) !== null) && (+new Date().getTime().toString().slice(0, 10) < exp);
  }

  /**
   * Function to stop the loop of reloading datas.
   */
  public stopReload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
