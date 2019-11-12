import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState, initialState} from './app.state';

import { visitReducer } from './visits/visits.reducers';
import { salesRepresentativeReducer } from './salesRepresentatives/salesRepresentatives.reducers';
import { countryReducer } from './countries/countries.reducers';
import { customerReducer } from './customers/customers.reducers';

const reducers: ActionReducerMap<AppState> ={
    countries: countryReducer,
    customers: customerReducer,
    visits: visitReducer,
    salesRepresentatives: salesRepresentativeReducer,
}

export const ReducersStoreModule = StoreModule.forRoot(reducers, {
    initialState
})



