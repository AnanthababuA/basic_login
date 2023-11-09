import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean = false;

  constructor(private http: HttpClient) { }

  login(loginCredentials: any): Observable<any> {

    return this.http.post(env.apiHost.concat('/registration/db_auth'), loginCredentials, httpOptions)


  }

  genOtpService(generateOTP: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/registration/generate-otp'), generateOTP, httpOptions)

  }

  refreshToken(token: string) {

    return this.http.post(env.apiHost.concat('/registration/token/refresh'), { refresh: token }, httpOptions);

  }

  getVersionNumber(): Observable<any> {

    return this.http.post(env.apiHost.concat('/registration/version-detail') , "")

  }
}
