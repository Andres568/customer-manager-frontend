import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from '../common/models/visit';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
  protected URL = 'http://localhost:9090/api/visits';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Visit> {
    return this.http.get<Visit>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.URL, {params: params});
  }

  public insert(data: Visit): Observable<Visit> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.URL, data, {headers: headers})
    .pipe(
      map(response => response.visit)
    );
  }

  public update(visit: Visit): Observable<Visit> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Visit>(this.URL + '/' + visit.id, visit, {headers: headers});
  }

  public delete(id): Observable<Visit> {
    return this.http.delete<Visit>(this.URL + '/' + id);
  }

}
