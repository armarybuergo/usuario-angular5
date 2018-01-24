import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UsuarioComponent } from './models/usuario.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import {
  HttpModule, Http,
  XHRBackend, RequestOptions
} from '@angular/http';

import { AppComponent } from './app.component';
import { ErrorNotifierService } from './services/error.notifier';
import { UsuarioHttp } from './services/usuario.http';
import { AppRequestOptions, WEBAPI_URL_TOKEN } from './services/app.request.options';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    ErrorNotifierService,
    {
      provide: Http,
      useFactory:(backend: XHRBackend, defaultOptions: RequestOptions, errorNotifier: ErrorNotifierService) => {
        return new UsuarioHttp(backend, defaultOptions, errorNotifier);
      },
      deps: [ XHRBackend, RequestOptions, ErrorNotifierService ]
    },
    {
      provide: WEBAPI_URL_TOKEN, useValue: 'http://localhost:8080'
    },
    {
      provide: RequestOptions, useClass: AppRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
