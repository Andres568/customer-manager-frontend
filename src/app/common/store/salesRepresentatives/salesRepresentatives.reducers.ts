
import { SalesRepresentative } from '../../models/salesRepresentative';
import * as salesRepresentativesActions from './salesRepresentatives.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: SalesRepresentative[];
    selected: SalesRepresentative;
    action: string;
    done: boolean;
    error?: Error;
}

export const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
  };

export function salesRepresentativeReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all salesRepresentatives actions
     ************************/
    case salesRepresentativesActions.GET_SALESREPRESENTATIVES:
      return {
        ...state,
        action: salesRepresentativesActions.GET_SALESREPRESENTATIVES,
        done: false,
        error: null
      };
    case salesRepresentativesActions.GET_SALESREPRESENTATIVES_SUCCESS:

      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case salesRepresentativesActions.GET_SALESREPRESENTATIVES_ERROR:
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

export const getSalesRepresentativesState = createFeatureSelector <State> ('salesRepresentatives');
export const getAllSalesRepresentatives = createSelector(getSalesRepresentativesState, (state: State) => state.data);
export const getSalesRepresentativesError = createSelector(getSalesRepresentativesState, (state: State) => {
  return state.action === salesRepresentativesActions.GET_SALESREPRESENTATIVES
    ? state.error
   : null;
});