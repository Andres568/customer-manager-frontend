import { Injectable } from '@angular/core';
import { GetAllCountries } from '../common/store/countries/countries.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../common/store/app.state';
import { Country } from '../common/models/country';
import { Observable, merge } from 'rxjs';
import { getAllCountries, getCountriesError } from '../common/store/countries/countries.reducers';
import { skipWhile, map } from 'rxjs/operators';
import { Visit } from '../common/models/visit';
import { GetAllVisits, GetVisit, AddVisit, UpdateVisit, RemoveVisit } from '../common/store/visits/visits.actions';
import { getAllVisits, getVisit, getVisitsError, getVisitError, isVisitCreated, createVisitError, isVisitUpdated, updateVisitError, isVisitDeleted, deleteVisitError } from '../common/store/visits/visits.reducers';
import { GetAllCustomers, GetCustomer, AddCustomer, UpdateCustomer, RemoveCustomer } from '../common/store/customers/customers.actions';
import { getAllCustomers, getCustomer, getCustomerError, getCustomersError, isCustomerCreated, createCustomerError, isCustomerUpdated, updateCustomerError, isCustomerDeleted, deleteCustomerError } from '../common/store/customers/customers.reducers';
import { Customer } from '../common/models/customer';
import { SalesRepresentative } from '../common/models/salesRepresentative';
import { GetAllSalesRepresentatives } from '../common/store/salesRepresentatives/salesRepresentatives.actions';
import { getAllSalesRepresentatives, getSalesRepresentativesError } from '../common/store/salesRepresentatives/salesRepresentatives.reducers';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<AppState>) { }

  getAllCountries(): Observable<Country[]> {
    this.store.dispatch(new GetAllCountries());
    return merge(
      this.store.select(getAllCountries),
      this.store.select(getCountriesError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  getAllVisits(): Observable<Visit[]> {
    this.store.dispatch(new GetAllVisits());
    return merge(
      this.store.select(getAllVisits),
      this.store.select(getVisitsError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  getVisit(id: number): Observable<Visit> {
    this.store.dispatch(new GetVisit(id));
    return merge(
      this.store.select(getVisit)
        .pipe(
          skipWhile(val => val == null),
        ),
      this.store.select(getVisitError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  addVisit(visit: Visit): Observable<boolean> {
    this.store.dispatch(new AddVisit(visit));
    return merge(
      this.store.select(isVisitCreated),
      this.store.select(createVisitError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  updateVisit(visit: Visit): Observable<boolean> {
    this.store.dispatch(new UpdateVisit(visit));
    return merge(
      this.store.select(isVisitUpdated),
      this.store.select(updateVisitError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  removeVisit(id: number): Observable<boolean> {
    this.store.dispatch(new RemoveVisit(id));
    return merge(
      this.store.select(isVisitDeleted),
      this.store.select(deleteVisitError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  getAllCustomers(): Observable<Customer[]> {
    this.store.dispatch(new GetAllCustomers());
    return merge(
      this.store.select(getAllCustomers)
        .pipe(
          skipWhile(val => val == null),
        ), 
      this.store.select(getCustomersError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  getCustomer(id: number): Observable<Customer> {
    this.store.dispatch(new GetCustomer(id));
    return merge(
      this.store.select(getCustomer)
        .pipe(
          skipWhile(val => val == null),
        ),
      this.store.select(getCustomerError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  addCustomer(customer: Customer): Observable<boolean> {
    this.store.dispatch(new AddCustomer(customer));
    return merge(
      this.store.select(isCustomerCreated),
      this.store.select(createCustomerError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  updateCustomer(customer: Customer): Observable<boolean>{
    this.store.dispatch(new UpdateCustomer(customer));
    return merge(
      this.store.select(isCustomerUpdated),
      this.store.select(updateCustomerError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  removeCustomer(id: number): Observable<boolean> {
    this.store.dispatch(new RemoveCustomer(id));
    return merge(
      this.store.select(isCustomerDeleted),
      this.store.select(deleteCustomerError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }

  getAllSalesRepresentatives(): Observable<SalesRepresentative[]> {
    this.store.dispatch(new GetAllSalesRepresentatives());
    return merge(
      this.store.select(getAllSalesRepresentatives),
      this.store.select(getSalesRepresentativesError)
        .pipe(
          skipWhile(val => val == null),
          map(err => {
            throw err;
          })
        )
    );
  }
}
