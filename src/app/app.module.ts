import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerWrapperComponent } from './components/spinner-wrapper/spinner-wrapper.component';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
import { PortalModule } from '@angular/cdk/portal';
import { TokenInterceptorService } from './services/token-interceptor.service';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { ContractNumberFormatterDirective } from './shared/directives/contract-number-formatter.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupWindowComponent } from './components/popup-window/popup-window.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpinnerComponent,
    SpinnerWrapperComponent,
    PopupWindowComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    //  ReactiveFormsModule,
    BrowserAnimationsModule,
    PortalModule,
    PlotlyModule.forRoot(PlotlyJS),
    ContractNumberFormatterDirective,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
