import { Injectable, Inject, InjectionToken} from '@angular/core';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';

export const WEBAPI_URL_TOKEN = new InjectionToken('webApiBaseUrl');

export class AppRequestOptions extends BaseRequestOptions {
  constructor(@Inject(WEBAPI_URL_TOKEN) private webApiBaseUrl:string) {
  	super();
  	console.log('webApiBaseUrl = '+webApiBaseUrl);
  }

  merge(options?:RequestOptionsArgs):RequestOptions {
    options.url = (this.webApiBaseUrl ? this.webApiBaseUrl :
    				'http://localhost:8080') + options.url;
    return super.merge(options);
  }
}