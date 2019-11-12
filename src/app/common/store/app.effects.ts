import {EffectsModule} from '@ngrx/effects';
import { SalesRepresentativeEffects } from './salesRepresentatives/salesRepresentatives.effects';
import { CountryEffects } from './countries/countries.effects';
import { CustomerEffects } from './customers/customers.effects';
import { VisitEffects } from './visits/visits.effects';


export const EffectsStoreModule =
    EffectsModule.forRoot([
        CountryEffects,
        CustomerEffects,
        VisitEffects,
        SalesRepresentativeEffects
    ]);