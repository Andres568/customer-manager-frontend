
import { Country } from '../../models/country';
import * as countriesActions from './countries.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Country[];
    action: string;
    selected: Country;
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

export function countryReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all countries actions
     ************************/
    case countriesActions.GET_COUNTRIES:
      return {
        ...state,
        action: countriesActions.GET_COUNTRIES,
        done: false,
        error: null
      };
    case countriesActions.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case countriesActions.GET_COUNTRIES_ERROR:
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

export const getCountriesState = createFeatureSelector <State> ('countries');
export const getAllCountries = createSelector(getCountriesState, (state: State) => state.data);
export const getCountriesError = createSelector(getCountriesState, (state: State) => {
  return state.action === countriesActions.GET_COUNTRIES
    ? state.error
   : null;
});