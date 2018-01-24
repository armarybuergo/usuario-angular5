import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import {ErrorNotifierService} from './error.notifier';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UsuarioHttp extends Http {
  constructor(backend: ConnectionBackend,
            defaultOptions: RequestOptions,
            private errorService: ErrorNotifierService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the request...');
    return super.request(url, options)
        .catch((err: any): any => {
          this.errorService.notifyError(err);
          return Observable.empty();
        })
        .retryWhen(error => error.delay(500))
        .timeoutWith(2000, Observable.throw(new Error('delay exceeded')))
        .finally(() => {
          console.log('After the request...');
        });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the request...');
    console.log('url ' + url);
    console.log('options ' + options);
    return super.get(url, options)
        .catch((err: any): any => {
          if (err.status === 400 || err.status === 422) {
            return Observable.throw(err);
          } else {
            this.errorService.notifyError(err);
            return Observable.empty();
          }
        })
        .retryWhen(error => error.delay(500))
        .timeoutWith(2000, Observable.throw(new Error('delay exceeded')))
        .finally(() => {
          console.log('After the request...');
        });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    console.log('Before the request...');
    return super.post(url, body, options)
        .catch((err: any): any => {
          if (err.status === 400 || err.status === 422) {
            return Observable.throw(err);
          } else {
            this.errorService.notifyError(err);
            return Observable.empty();
          }
        })
        .finally(() => {
          console.log('After the request...');
        });
  }

}