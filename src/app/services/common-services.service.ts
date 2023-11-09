import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private http: HttpClient) { }

  createUnit(createUnit: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/registration/create-unit'), createUnit)

  }

  createLocalAdmin(createLocalUnit: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/ladmin-creation'), createLocalUnit)

  }

  updateLocalAdmin(createLocalUnit: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/registration/updateLocalUnit'), createLocalUnit)

  }

  unitNameLocalAdmin(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/get-unit-details'), {})

  }

  unitTypeLocalAdmin(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/get-user-type'), {})

  }

  UnitDetails(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/usermgt/unit-details'), {})

  }

  policySummary(): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/policy/policy-summary'), {})

  }

  addPolicy(policyDeail: any): Observable<any> {
   
    return this.http.post(env.apiHost.concat('/policy/policy-add'), policyDeail)

  }


}
