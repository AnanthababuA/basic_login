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

    // return this.http.post(env.apiHost.concat('/exammgt/db_auth'), loginCredentials, httpOptions)
    return this.http.post(env.apiHost.concat('/auth/login'), loginCredentials, httpOptions)


  }

  refreshToken(token: string) {

    return this.http.post(env.apiHost.concat('/exammgt/token/refresh'), { refresh: token }, httpOptions);

  }

  version(){
    // return this.http.post(env.apiHost.concat('/exammgt/version-detail'), {});
    return this.http.get(env.apiHost.concat('/auth/version'), {});


  }


  genOtpService(generateOTP: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/registration/generate-otp'), generateOTP, httpOptions)

  }

  getVersionNumber(): Observable<any> {

    return this.http.post(env.apiHost.concat('/registration/version-detail') , {})

  }

  genCaptcha(): Observable<any> {

    return this.http.get(env.apiHost.concat('/auth/captcha') , {})

  }

}
