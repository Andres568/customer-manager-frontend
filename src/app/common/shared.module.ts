import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { NavtabsComponent } from './components/navtabs/navtabs.component';
import { MaterialModule } from './material.module';
import { ReducersStoreModule } from './store/app.reducers';
import { EffectsStoreModule } from './store/app.effects';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ReducersStoreModule,
    EffectsStoreModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ChartsModule
  ],
  declarations: [
    HeaderComponent,
    NavtabsComponent,
    FooterComponent,
  ],
  providers: [Store],
  exports: [
    HeaderComponent,
    NavtabsComponent,
    FooterComponent,

    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    StoreModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ChartsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
