
import { Visit } from '../../models/visit';
import * as visitsActions from './visits.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Visit[];
    selected: Visit;
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

export function visitReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all visits actions
     ************************/
    case visitsActions.GET_VISITS:
      return {
        ...state,
        action: visitsActions.GET_VISITS,
        done: false,
        error: null
      };
    case visitsActions.GET_VISITS_SUCCESS:
      
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case visitsActions.GET_VISITS_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

      /*************************
     * GET visit by Id actions
     ************************/
    case visitsActions.GET_VISIT:
    return {
      ...state,
      action: visitsActions.GET_VISIT,
      done: false,
      selected: null,
      error: null
    };
    case visitsActions.GET_VISIT_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case visitsActions.GET_VISIT_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE create actions
       ************************/
      case visitsActions.CREATE_VISIT:
      return {
        ...state,
        selected: action.payload,
        action: visitsActions.CREATE_VISIT,
        done: false,
        error: null
      };
      case visitsActions.CREATE_VISIT_SUCCESS:
        {
 
          const data = [
            ...state.data,
            action.payload
          ];
          return {
            ...state,
            data,
            selected: null,
            error: null,
            done: true
          };
        }
      case visitsActions.CREATE_VISIT_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE game actions
       ************************/
      case visitsActions.UPDATE_VISIT:
      return {
        ...state,
        action: visitsActions.UPDATE_VISIT,
        done: false,
        error: null
      };
    case visitsActions.UPDATE_VISIT_SUCCESS:
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
    case visitsActions.UPDATE_VISIT_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

    /*************************
     * DELETE visit actions
     ************************/
    case visitsActions.DELETE_VISIT:
      {
        const selected = state.data.find(h => h.id === action.payload);
        console.log(action.payload)
        return {
          ...state,
          selected,
          action: visitsActions.DELETE_VISIT,
          done: false,
          error: null
        };
      }
    case visitsActions.DELETE_VISIT_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== action.payload);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case visitsActions.DELETE_VISIT_ERROR:
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

export const getVisitsState = createFeatureSelector <State> ('visits');
export const getAllVisits = createSelector(getVisitsState, (state: State) => state.data);
export const getVisit = createSelector(getVisitsState, (state: State) => {   
  if (state.action === visitsActions.GET_VISIT && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isVisitDeleted = createSelector(getVisitsState, (state: State) =>
  state.action === visitsActions.DELETE_VISIT && state.done && !state.error);
export const isVisitCreated = createSelector(getVisitsState, (state: State) =>
 state.action === visitsActions.CREATE_VISIT && state.done && !state.error);
export const isVisitUpdated = createSelector(getVisitsState, (state: State) =>
 state.action === visitsActions.UPDATE_VISIT && state.done && !state.error);

export const deleteVisitError = createSelector(getVisitsState, (state: State) => {
  return state.action === visitsActions.DELETE_VISIT
    ? state.error
   : null;
});
export const createVisitError = createSelector(getVisitsState, (state: State) => {
  return state.action === visitsActions.CREATE_VISIT
    ? state.error
   : null;
});
export const updateVisitError = createSelector(getVisitsState, (state: State) => {
  return state.action === visitsActions.UPDATE_VISIT
    ? state.error
   : null;
});
export const getVisitsError = createSelector(getVisitsState, (state: State) => {
  return state.action === visitsActions.GET_VISITS
    ? state.error
   : null;
});
export const getVisitError = createSelector(getVisitsState, (state: State) => {
  return state.action === visitsActions.GET_VISIT
    ? state.error
   : null;
});