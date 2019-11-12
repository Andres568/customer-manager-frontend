import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './common/shared.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
