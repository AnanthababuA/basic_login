// // import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
//   HttpClient,HTTP_INTERCEPTORS
// } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// // import { NgxSpinnerService } from 'ngx-spinner';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { TokenStorageService } from '../services/token-storage.service';
// import { environment as env } from '../../environments/environment';
// // import Swal from 'sweetalert2';
// import { catchError, filter, switchMap, take } from 'rxjs/operators';
// import Swal from 'sweetalert2';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { Injectable } from '@angular/core';

// const TOKEN_HEADER_KEY = 'Authorization';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

//   constructor(private tokenService: TokenStorageService, private authService: AuthService, private router: Router, private http: HttpClient, private spinner: NgxSpinnerService) {}

//   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     // return next.handle(request);
//     let authReq = req;
//     const token = this.tokenService.getToken();
//     console.log("inters.. token", token);
    
//     if (token != null) {
//       authReq = this.addTokenHeader(req, token);
//     }

//     return next.handle(authReq).pipe(catchError(error => {

//       if ((error instanceof HttpErrorResponse && error.status === 500)) {

//         this.spinner.hide();

//         Swal.fire('Unable to connect server', '', 'error');

//         this.router.navigate(['/authentication/login'])
//       }

//       if (error instanceof HttpErrorResponse && !authReq.url.includes('/authentication/login') && error.status === 401) {

//         if (authReq.url.includes('/registration/token/refresh')) {

//           // console.log('Expired Refresh Token')

//           this.spinner.hide();

//           this.router.navigate(['/authentication/login'])

//         } else {

//           return this.handle401Error(authReq, next);

//         }
//       }

//       return throwError(error);
//     }));
//   }


//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);

//       const token = this.tokenService.getRefreshToken();

//       this.http.post<any>(env.apiHost.concat('/registration/token/verify'), { token: token }).subscribe((res) => {

//         console.log("verify response",res)

//       }, catchError => {

//         this.router.navigate(['/authentication/login'])

//       });

//       if (token)
//         return this.authService.refreshToken(token).pipe(
//           switchMap((token: any) => {
//             this.isRefreshing = false;

//             if (token.access != undefined) {

//               this.tokenService.saveToken(token.access);
//               this.tokenService.saveRefreshToken(token.refresh);
//               this.refreshTokenSubject.next(token.refresh);

//               return next.handle(this.addTokenHeader(request, token.access));
//             }
//             else {
//               this.tokenService.signOut();
//               return next.handle(request);
//             }
//           }),
//           catchError((err) => {
//             this.isRefreshing = false;

//             this.tokenService.signOut();
//             return throwError(err);
//           })
//         );
//     }

//     return this.refreshTokenSubject.pipe(
//       filter(token => token !== null),
//       take(1),
//       switchMap((token) => next.handle(this.addTokenHeader(request, token)))
//     );
//   }

//   private addTokenHeader(request: HttpRequest<any>, token: string) {

//     return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

//   }

// }


// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// ];



import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, exhaustMap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment as env } from '../../environments/environment';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone();
    const token = this.tokenService.getToken();

    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      const token = this.tokenService.getRefreshToken();

      this.http.post<any>(env.apiHost.concat('/registration/token/verify'), { token: token }).subscribe((res) => {

        console.log("verify response",res)

      }, catchError => {

        this.router.navigate(['/authentication/login'])

      });

  
      if (token !== null) { // Ensure token is not null before proceeding
        return this.authService.refreshToken(token).pipe(
          switchMap((refreshedToken: any) => {
            this.isRefreshing = false;
  
            if (refreshedToken?.access) {
              this.tokenService.saveToken(refreshedToken.access);
              this.tokenService.saveRefreshToken(refreshedToken.refresh);
              this.refreshTokenSubject.next(refreshedToken.access);
              return next.handle(this.addTokenHeader(request, refreshedToken.access));
            } else {
              this.tokenService.signOut();
              return throwError('No access token received');
            }
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.tokenService.signOut();
            return throwError(err);
          })
        );
      } else {
        this.isRefreshing = false;
        this.tokenService.signOut();
        return throwError('Null token encountered');
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        exhaustMap((token) => {
          if (typeof token === 'string') { // Ensure token is of type 'string'
            return next.handle(this.addTokenHeader(request, token));
          } else {
            this.tokenService.signOut();
            return throwError('Invalid token type');
          }
        })
      );
    }
  }
  

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];


