import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as customerActions from './customers.actions';

import {Action} from '@ngrx/store';
import {
    GetAllCustomersSuccess,GetAllCustomersError,
    GetCustomer, GetCustomerSuccess, GetCustomerError,
    AddCustomer, AddCustomerSuccess, AddCustomerError,
    UpdateCustomer, UpdateCustomerSuccess, UpdateCustomerError,
    RemoveCustomer, RemoveCustomerSuccess, RemoveCustomerError
} from './customers.actions';

import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { Customer} from '../../models/customer';
import { Observable } from 'rxjs/internal/Observable';
import { CustomersService } from 'src/app/_services/customers.service';


@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions,
              private svc: CustomersService) {
  }

    @Effect()
    getAllCustomers$: Observable<Action> = this.actions$
    .pipe(
        ofType(customerActions.GET_CUSTOMERS),
        switchMap(() => this.svc.findAll()),
        map(customers => new GetAllCustomersSuccess(customers)),
        catchError((err) => [new GetAllCustomersError(err)])
    );

    @Effect()
    createCustomer$ = this.actions$
    .pipe(
        ofType(customerActions.CREATE_CUSTOMER),
        map((action: AddCustomer) => action.payload),
        switchMap(newCustomer => this.svc.insert(newCustomer)),
        map((customer: Customer) => new AddCustomerSuccess(customer)),
        catchError((err) => [new AddCustomerError(err)])
    );

    @Effect()
    updateCustomer$ = this.actions$
    .pipe(
        ofType(customerActions.UPDATE_CUSTOMER),
        map((action: UpdateCustomer) => action.payload),
        // map((customer: Customer) => {
        //     customer.visits = undefined;
        //     return customer;
        // }),
        switchMap(customer => this.svc.update(customer), (customer) => customer),
        map((customer: Customer) => new UpdateCustomerSuccess(customer)),
        catchError((err) => [new UpdateCustomerError(err)])
    );

    @Effect()
    getCustomer$ = this.actions$
    .pipe(
        ofType(customerActions.GET_CUSTOMER),
        map((action: GetCustomer) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(customer => new GetCustomerSuccess(customer)),
        catchError((err) => [new GetCustomerError(err)]),
    );
      
    @Effect()
    removeCustomer$ = this.actions$
    .pipe(
        ofType(customerActions.DELETE_CUSTOMER),
        map((action: RemoveCustomer) => action.payload),
        switchMap(id => this.svc.delete(id), id => id),
        tap(customerId => console.log(customerId)),
        map(customerId => new  RemoveCustomerSuccess(customerId)),
        catchError((err) => [new RemoveCustomerError(err)])
    );

}