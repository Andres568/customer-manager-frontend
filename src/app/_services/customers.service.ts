import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../common/models/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  protected URL = 'http://localhost:9090/api/customers';

  constructor(protected http: HttpClient) { }

  public findById(id: any): Observable<Customer> {
    return this.http.get<Customer>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL, {params: params});
  }

  public insert(data: Customer): Observable<Customer> {
    let headers = new HttpHeaders();
    console.log(data);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.URL, data, {headers: headers})
    .pipe(
      map(response => response.customer)
    );
  }

  public update(customer: Customer): Observable<Customer> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Customer>(this.URL + '/' + customer.id, customer, {headers: headers});
  }

  public delete(id): Observable<Customer> {
    return this.http.delete<Customer>(this.URL + '/' + id);
  }

}
