import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../common/models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  protected URL = 'http://localhost:9090/api/customers/countries';

  constructor(protected http: HttpClient) { }

  public findAll(params?): Observable<Country[]> {
    return this.http.get<Country[]>(this.URL, {params: params});
  }

}
