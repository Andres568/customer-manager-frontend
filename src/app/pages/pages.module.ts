import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../common/shared.module';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { CreateVisitComponent } from './visits/create-visit/create-visit.component';
import { EditVisitComponent } from './visits/edit-visit/edit-visit.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { CustomersComponent } from './customers/customers/customers.component';
import { VisitsComponent } from './visits/visits/visits.component';

@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })    ],
    declarations:[
        HomeComponent,
        CustomersComponent,
        CreateCustomerComponent,
        EditCustomerComponent,
        VisitsComponent,
        CreateVisitComponent,
        EditVisitComponent,
        SignInComponent,
    ],
    entryComponents: [  
        CreateCustomerComponent, 
        CreateVisitComponent,
        EditCustomerComponent,
        EditVisitComponent, 
    ],
    exports:[
    ]

})
export class PagesModule{}