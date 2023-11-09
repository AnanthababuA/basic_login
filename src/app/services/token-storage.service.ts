import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
const USERTYPE_KEY = 'auth-usertype';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }


  signOut(): void {

    localStorage.clear();
    
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

  public saveUser(userName: any): void {

    localStorage.removeItem(USER_KEY);

    localStorage.setItem(USER_KEY, userName); // user name set
  }

  public saveUserType(userType: any): void {
    localStorage.removeItem(USERTYPE_KEY);
    localStorage.setItem(USERTYPE_KEY, userType);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }

    return {};
  }

  public getUserType(): any {
    const user = localStorage.getItem(USERTYPE_KEY);
    if (user) {
      return user;
    }

    return {};
  }

}
