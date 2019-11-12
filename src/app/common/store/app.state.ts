
import {
  initialState as Country,
  State as countriestate
} from './countries/countries.reducers';
import {
  initialState as Customer,
  State as CustomerState
} from './customers/customers.reducers';
import {
  initialState as Visit,
  State as VisitState
} from './visits/visits.reducers';
import {
  initialState as SalesRepresentative,
  State as SalesRepresentativeState
} from './salesRepresentatives/salesRepresentatives.reducers';


export interface AppState {
  countries: countriestate;
  customers: CustomerState;
  visits: VisitState;
  salesRepresentatives: SalesRepresentativeState;
}

export const initialState: AppState = {
  countries: Country,
  customers: Customer,
  visits: Visit,
  salesRepresentatives: SalesRepresentative
}

