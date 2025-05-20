import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter} from '@angular-material-components/datetime-picker';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {AsyncPipe} from '@angular/common';
import {provideToastr, ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MeasurementsCardComponent} from './components/measurements/measurements-card/measurements-card.component';

import {AppDateAdapter, MAT_DATE_FNS_DATE_FORMATS, NGX_DATE_FORMATS} from './app.date-adapter';
import {NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, NgxMatMomentAdapter} from '@angular-material-components/moment-adapter';


export const DEFAULT_FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions = {
  appearance: 'outline',
  floatLabel: 'always',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MeasurementsCardComponent,
    MatDialogModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: DEFAULT_FORM_FIELD_OPTIONS,
    },
    {
      provide: AsyncPipe,
      useClass: AsyncPipe
    },
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: NGX_MAT_DATE_FORMATS, useValue: NGX_DATE_FORMATS},
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter, // Moment adapter
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    provideToastr({positionClass: 'toast-top-center', tapToDismiss: true}),
    importProvidersFrom(BrowserAnimationsModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
