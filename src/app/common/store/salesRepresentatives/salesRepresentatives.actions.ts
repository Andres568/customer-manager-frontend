import { Action } from '@ngrx/store';
import { SalesRepresentative} from '../../models/salesRepresentative';


export const GET_SALESREPRESENTATIVES = '[ALL] SalesRepresentatives';
export const GET_SALESREPRESENTATIVES_SUCCESS = '[ALL] SalesRepresentatives Success';
export const GET_SALESREPRESENTATIVES_ERROR = '[ALL] SalesRepresentatives Error';

/****************************************
 * GET all the SalesRepresentatives
 ****************************************/
export class GetAllSalesRepresentatives implements Action {
    readonly type = GET_SALESREPRESENTATIVES;
    constructor(){}
}

export class GetAllSalesRepresentativesSuccess implements Action {
  readonly type = GET_SALESREPRESENTATIVES_SUCCESS;

  constructor(public payload: SalesRepresentative[]) {
  }
}

export class GetAllSalesRepresentativesError implements Action {
  readonly type = GET_SALESREPRESENTATIVES_ERROR;

  constructor(public payload: Error) {
  }
}
