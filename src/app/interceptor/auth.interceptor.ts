import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,HTTP_INTERCEPTORS
} from '@angular/common/http';
// import { Observable } from 'rxjs';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { environment as env } from '../../environments/environment';
// import Swal from 'sweetalert2';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenStorageService, private authService: AuthService, private router: Router, private http: HttpClient) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    let authReq = req;
    const token = this.tokenService.getToken();
    console.log("inters.. token", token);
    
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {

      if ((error instanceof HttpErrorResponse && error.status === 500)) {

        // this.spinner.hide();

        // Swal.fire('Unable to connect server', '', 'error');

        this.router.navigate(['/login'])
      }

      if (error instanceof HttpErrorResponse && !authReq.url.includes('/login') && error.status === 401) {

        if (authReq.url.includes('/registration/token/refresh')) {

          // console.log('Expired Refresh Token')

          // this.spinner.hide();

          this.router.navigate(['/login'])

        } else {

          return this.handle401Error(authReq, next);

        }
      }

      return throwError(error);
    }));
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      this.http.post<any>(env.apiHost.concat('/registration/token/verify'), { token: token }).subscribe((res) => {

        // console.log(res)

      }, catchError => {

        this.router.navigate(['/login'])

      });

      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            if (token.access != undefined) {

              this.tokenService.saveToken(token.access);
              this.tokenService.saveRefreshToken(token.refresh);
              this.refreshTokenSubject.next(token.refresh);

              return next.handle(this.addTokenHeader(request, token.access));
            }
            else {
              this.tokenService.signOut();
              return next.handle(request);
            }
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.tokenService.signOut();
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {

    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    // return request.clone({ setHeaders: { Authorization: `Bearer ${token}`, Retry: "true" } });

  }

}


export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

