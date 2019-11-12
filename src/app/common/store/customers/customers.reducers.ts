
import { Customer } from '../../models/customer';
import * as customersActions from './customers.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Customer[];
    action: string;
    selected: Customer;
    done: boolean;
    error?: Error;
}

export const initialState: State = {
    data: [],
    action: null,
    selected: null,
    done: false,
    error: null
  };

export function customerReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all customers actions
     ************************/
    case customersActions.GET_CUSTOMERS:
      return {
        ...state,
        action: customersActions.GET_CUSTOMERS,
        done: false,
        error: null
      };
    case customersActions.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case customersActions.GET_CUSTOMERS_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

      /*************************
     * GET customer by Id actions
     ************************/
    case customersActions.GET_CUSTOMER:
    return {
      ...state,
      action: customersActions.GET_CUSTOMER,
      done: false,
      selected: null,
      error: null
    };
    case customersActions.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case customersActions.GET_CUSTOMER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE customer actions
       ************************/
      case customersActions.CREATE_CUSTOMER:
      return {
        ...state,
        selected: action.payload,
        action: customersActions.CREATE_CUSTOMER,
        done: false,
        error: null
      };
      case customersActions.CREATE_CUSTOMER_SUCCESS:
        {
          const data = [
            ...state.data,
            action.payload
          ];
          return {
            ...state,
            data,
            error: null,
            done: true
          };
        }
      case customersActions.CREATE_CUSTOMER_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE customer actions
       ************************/
      case customersActions.UPDATE_CUSTOMER:
      return {
        ...state,
        action: customersActions.UPDATE_CUSTOMER,
        done: false,
        error: null
      };
    case customersActions.UPDATE_CUSTOMER_SUCCESS:
      {
        const index = state
          .data
          .findIndex(c => c.id === action.payload.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            action.payload,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            error: null
          };
        }
        return state;
      }
    case customersActions.UPDATE_CUSTOMER_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
     * DELETE customer actions
     ************************/
    case customersActions.DELETE_CUSTOMER:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: customersActions.DELETE_CUSTOMER,
          done: false,
          error: null
        };
      }
    case customersActions.DELETE_CUSTOMER_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== action.payload);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case customersActions.DELETE_CUSTOMER_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/

export const getCustomersState = createFeatureSelector <State> ('customers');
export const getAllCustomers = createSelector(getCustomersState, (state: State) => state.data);
export const getCustomer = createSelector(getCustomersState, (state: State) => { 
  if (state.action === customersActions.GET_CUSTOMER && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isCustomerDeleted = createSelector(getCustomersState, (state: State) =>
  state.action === customersActions.DELETE_CUSTOMER && state.done && !state.error);
export const isCustomerCreated = createSelector(getCustomersState, (state: State) =>
 state.action === customersActions.CREATE_CUSTOMER && state.done && !state.error);
export const isCustomerUpdated = createSelector(getCustomersState, (state: State) =>
 state.action === customersActions.UPDATE_CUSTOMER && state.done && !state.error);

export const deleteCustomerError = createSelector(getCustomersState, (state: State) => {
  return state.action === customersActions.DELETE_CUSTOMER
    ? state.error
   : null;
});
export const createCustomerError = createSelector(getCustomersState, (state: State) => {
  return state.action === customersActions.CREATE_CUSTOMER
    ? state.error
   : null;
});
export const updateCustomerError = createSelector(getCustomersState, (state: State) => {
  return state.action === customersActions.UPDATE_CUSTOMER
    ? state.error
   : null;
});
export const getCustomersError = createSelector(getCustomersState, (state: State) => {
  return state.action === customersActions.GET_CUSTOMERS
    ? state.error
   : null;
});
export const getCustomerError = createSelector(getCustomersState, (state: State) => {
  return state.action === customersActions.GET_CUSTOMER
    ? state.error
   : null;
});
