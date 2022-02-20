import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastService } from '../services/tools/toast.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(
    private toasService: ToastService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    if (request.url.includes(`${environment.apiserver}User`)) {
      return next.handle(request).pipe(
        catchError((err: any) => {
          // this.store.dispatch(new CatchError(err.error));
          this.toasService.addSingle('error', err.error);
          return throwError(err);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
