import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as visitActions from './visits.actions';

import {Action} from '@ngrx/store';
import {
    GetAllVisitsSuccess,GetAllVisitsError,
    GetVisit, GetVisitSuccess, GetVisitError,
    AddVisit, AddVisitSuccess, AddVisitError,
    UpdateVisit, UpdateVisitSuccess, UpdateVisitError,
    RemoveVisit, RemoveVisitSuccess, RemoveVisitError
} from './visits.actions';

import { switchMap, map, catchError, concatMap } from 'rxjs/operators';

import { Visit} from '../../models/visit';
import { Observable } from 'rxjs/internal/Observable';
import { VisitsService } from 'src/app/_services/visits.service';


@Injectable()
export class VisitEffects {
  constructor(private actions$: Actions,
              private svc: VisitsService) {
  }

    @Effect()
    getAllVisits$: Observable<Action> = this.actions$
    .pipe(   
        ofType(visitActions.GET_VISITS),
        switchMap(() => this.svc.findAll()),
        map(visits => new GetAllVisitsSuccess(visits)),
        catchError((err) => [new GetAllVisitsError(err)])
    );

    @Effect()
    createVisit$ = this.actions$
    .pipe(
        ofType(visitActions.CREATE_VISIT),
        map((action: AddVisit) => action.payload),
        concatMap(newVisit => this.svc.insert(newVisit)),
        map((newVisit: Visit) => new AddVisitSuccess(newVisit)),
        catchError((err) => [new AddVisitError(err)])
    );

    @Effect()
    updateVisit$ = this.actions$
    .pipe(
        ofType(visitActions.UPDATE_VISIT),
        map((action: UpdateVisit) => action.payload),
        switchMap(visit => this.svc.update(visit)),
        map((visit: Visit) => new UpdateVisitSuccess(visit)),
        catchError((err) => [new UpdateVisitError(err)])
    );

    @Effect()
    getVisit$ = this.actions$
    .pipe(
        ofType(visitActions.GET_VISIT),
        map((action: GetVisit) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(visit => new GetVisitSuccess(visit)),
        catchError((err) => [new GetVisitError(err)]),
    );

    @Effect()
    removeVisit$ = this.actions$
    .pipe(
        ofType(visitActions.DELETE_VISIT),
        map((action: RemoveVisit) => action.payload),
        switchMap(id => this.svc.delete(id), id => id),
        map(visitId => new RemoveVisitSuccess(visitId)),
        catchError((err) => [new RemoveVisitError(err)])
    );

}