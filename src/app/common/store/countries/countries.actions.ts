import { Action } from '@ngrx/store';
import { Country} from '../../models/country';


export const GET_COUNTRIES = '[ALL] Countries';
export const GET_COUNTRIES_SUCCESS = '[ALL] Countries Success';
export const GET_COUNTRIES_ERROR = '[ALL] Countries Error';

/****************************************
 * GET all the Countries
 ****************************************/
export class GetAllCountries implements Action {
    readonly type = GET_COUNTRIES;
    constructor(){}
}

export class GetAllCountriesSuccess implements Action {
  readonly type = GET_COUNTRIES_SUCCESS;

  constructor(public payload: Country[]) {
  }
}

export class GetAllCountriesError implements Action {
  readonly type = GET_COUNTRIES_ERROR;

  constructor(public payload: Error) {
  }
}
