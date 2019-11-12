import { Action } from '@ngrx/store';
import { Visit} from '../../models/visit';


export const GET_VISITS = '[ALL] Visits';
export const GET_VISITS_SUCCESS = '[ALL] Visits Success';
export const GET_VISITS_ERROR = '[ALL] Visits Error';

export const GET_VISIT = '[GET] VISIT';
export const GET_VISIT_SUCCESS = '[GET] Visits Success';
export const GET_VISIT_ERROR = '[GET] Visits Error';

export const CREATE_VISIT = '[CREATE] VISIT';
export const CREATE_VISIT_SUCCESS = '[CREATE] VISIT Success';
export const CREATE_VISIT_ERROR = '[CREATE] VISIT Error';

export const DELETE_VISIT = '[DELETE] VISIT';
export const DELETE_VISIT_SUCCESS = '[DELETE] VISIT Success';
export const DELETE_VISIT_ERROR = '[DELETE] VISIT Error';

export const UPDATE_VISIT = '[UPDATE] VISIT';
export const UPDATE_VISIT_SUCCESS = '[UPDATE] VISIT Success';
export const UPDATE_VISIT_ERROR = '[UPDATE] VISIT Error';


/****************************************
 * GET all the Visits
 ****************************************/
export class GetAllVisits implements Action {
    readonly type = GET_VISITS;
    constructor(){}
}

export class GetAllVisitsSuccess implements Action {
  readonly type = GET_VISITS_SUCCESS;

  constructor(public payload: Visit[]) {
  }
}

export class GetAllVisitsError implements Action {
  readonly type = GET_VISITS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET Visit by id
 ****************************************/
export class GetVisit implements Action {
  readonly type =GET_VISIT;

  constructor(public payload: number) {
  }
}

export class GetVisitSuccess implements Action {
  readonly type =GET_VISIT_SUCCESS;

  constructor(public payload: Visit) {
  }
}

export class GetVisitError implements Action {
  readonly type =GET_VISIT_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Visit
 ****************************************/
export class AddVisit implements Action {
  readonly type = CREATE_VISIT;

  constructor(public payload: Visit) { }
}

export class AddVisitSuccess implements Action {
  readonly type = CREATE_VISIT_SUCCESS;

  constructor(public payload: Visit) { }
}

export class AddVisitError implements Action {
  readonly type = CREATE_VISIT_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE Visit by id
 ****************************************/
export class UpdateVisit implements Action {
  readonly type = UPDATE_VISIT;

  constructor(public payload: Visit) {
  }
}

export class UpdateVisitSuccess implements Action {
  readonly type = UPDATE_VISIT_SUCCESS;

  constructor(public payload: Visit) { }
}

export class UpdateVisitError implements Action {
  readonly type = UPDATE_VISIT_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a Visit by id
 ****************************************/
export class RemoveVisit implements Action {
  readonly type = DELETE_VISIT;

  constructor(public payload: number) {
  }
}

export class RemoveVisitSuccess implements Action {
  readonly type = DELETE_VISIT_SUCCESS;

  constructor(public payload: number) {
  }
}

export class RemoveVisitError implements Action {
  readonly type = DELETE_VISIT_ERROR;

  constructor(public payload: Error) {
  }
}
