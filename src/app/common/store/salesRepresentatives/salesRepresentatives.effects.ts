import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as salesRepresentativeActions from './salesRepresentatives.actions';

import {Action} from '@ngrx/store';
import {
    GetAllSalesRepresentativesSuccess,GetAllSalesRepresentativesError
} from './salesRepresentatives.actions';

import { switchMap, map, catchError } from 'rxjs/operators';

import { SalesRepresentative} from '../../models/salesRepresentative';
import { Observable } from 'rxjs/internal/Observable';
import { SalesRepresentativesService } from 'src/app/_services/salesRepresentatives.service';


@Injectable()
export class SalesRepresentativeEffects {
  constructor(private actions$: Actions,
              private svc: SalesRepresentativesService) {
  }

    @Effect()
    getAllSalesRepresentatives$: Observable<Action> = this.actions$
    .pipe(
        ofType(salesRepresentativeActions.GET_SALESREPRESENTATIVES),
        switchMap(() => this.svc.findAll()),
        map(salesRepresentatives => new GetAllSalesRepresentativesSuccess(salesRepresentatives)),
        catchError((err) => [new GetAllSalesRepresentativesError(err)])
    );

}