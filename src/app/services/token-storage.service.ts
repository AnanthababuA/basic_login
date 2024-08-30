import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  user: string;
  usertype: string;
  district: string;
  dlock: string;
  // Add other fields as necessary
}


const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
const USERTYPE_KEY = 'auth-usertype';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  signOut(): void {

    localStorage.clear();

    this.auth.isLogin = false;

    this.router.navigate(['/']);

  }

  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

 handleTokenExpiration(token: string) {
    const decodedToken1 = jwtDecode(token);

    console.log("docekd token value", decodedToken1)

    if (!decodedToken1 || !decodedToken1.exp) {
      // Handle case where decoded token or expiration time is missing
      console.error('Invalid token or missing expiration time');
      return;
    }
    
    const expirationTime = decodedToken1.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    console.log("docekd token value expirationTime", expirationTime)
    console.log("docekd token value currentTime", currentTime)

    if (expirationTime < currentTime) {
      // Token has expired
      // Perform token refresh

      console.log("if docekd token value expirationTime", currentTime - expirationTime)

      this.router.navigate(['/authentication/login']);
     
    } else {
      // Token is still valid
      // Continue with your application logic
      console.log("else docekd token value expirationTime", expirationTime - currentTime)




    }
  }

  getUsername(token: string): string | null {
    const decoded = this.decodeToken(token);
    console.log("dceconde", decoded)
    return decoded ? decoded.user : null;
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    delete user.access;
    delete user.refresh
    localStorage.removeItem(USER_KEY);
    // console.log('user access keys',JSON.stringify(user))
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    // console.log("user acce refesh", user)
    if (user) {
      console.log("user logs", user);
      return JSON.parse(user);
    }

    return {};
  }

  // Store values in localStorage
  storeValues(udise_code: any, school_name: any, standard: any, user_name: any, class_section: any) {
    console.log("service user username", user_name)
    // this.tokenStorage.storeValues(res.udise_code, res.school_name, res.standard, res.Name, res.class_section)
    localStorage.setItem('udise_code', JSON.stringify(udise_code));
    localStorage.setItem('school_name', JSON.stringify(school_name));
    localStorage.setItem('standard', JSON.stringify(standard));
    localStorage.setItem('user_name', JSON.stringify(user_name));
    localStorage.setItem('class_section', JSON.stringify(class_section));

  }

  // Retrieve values from localStorage
  getStoredValues() {
    const udise_code = JSON.parse(localStorage.getItem('udise_code') ?? 'null');
    const school_name = JSON.parse(localStorage.getItem('school_name') ?? 'null');
    const standard = JSON.parse(localStorage.getItem('standard') ?? 'null');
    const user_name = JSON.parse(localStorage.getItem('user_name') ?? 'null');
    const class_section = JSON.parse(localStorage.getItem('class_section') ?? 'null');

    return { udise_code, school_name, standard, user_name, class_section};
  }

  checkRefreshToken(token: any): Observable<any> {

    return this.http.post<any>(env.apiHost.concat('/exammgt/token/verify'), { token: token })

  }
}

