import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesRepresentative } from '../common/models/salesRepresentative';

@Injectable({
  providedIn: 'root'
})
export class SalesRepresentativesService {
  protected URL = 'http://localhost:9090/api/visits/sales-representatives';

  constructor(protected http: HttpClient) { }

  public findAll(params?): Observable<SalesRepresentative[]> {
    return this.http.get<SalesRepresentative[]>(this.URL, {params: params});
  }

}
