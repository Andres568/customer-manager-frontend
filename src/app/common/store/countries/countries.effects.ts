import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as countryActions from './countries.actions';

import {Action} from '@ngrx/store';
import {
    GetAllCountriesSuccess,GetAllCountriesError,
} from './countries.actions';

import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';

import { Country} from '../../models/country';
import { Observable } from 'rxjs/internal/Observable';
import { CountriesService } from 'src/app/_services/countries.service';
import { AppState } from '../app.state';
import { StoreService } from 'src/app/_services/store.service';


@Injectable()
export class CountryEffects {
  constructor(private actions$: Actions,
              private svc: CountriesService,
              private storeService: StoreService) {
  }

    @Effect()
    getAllCountries$: Observable<Action> = this.actions$
    .pipe(   
        ofType(countryActions.GET_COUNTRIES),  
        switchMap(() => this.svc.findAll()),
        map(countries => new GetAllCountriesSuccess(countries)),
        catchError((err) => [new GetAllCountriesError(err)])
    );
}