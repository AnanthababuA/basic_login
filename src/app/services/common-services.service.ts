import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  constructor(private http: HttpClient, private router: Router) { }

  apiErrorHandler(error: any) {

    console.error(error);
  
    if (error.status === 500) {
  
      // Swal.alert('Server Error', 'Please contact the server administrator', 'error');
      Swal.fire({
        title: 'Server Error',
        html: 'There is some error, Try after some time.<br>If problem persists contact the administrator',
        icon: 'error',
      }).then((result) => {
  
          this.router.navigate(['/authentication/login']);
          
      });
  
    }
  
  }
  

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

  // addPolicy(policyDeail: any): Observable<any> {
   
  //   return this.http.post(env.apiHost.concat('/policy/policy-add'), policyDeail)

  // }


  addPolicy(policyvalue: any, policytype: any): Observable<any> {
    const requestBody = {
      policyvalue: policyvalue,
      policytype: policytype,
    };

    return this.http.post(env.apiHost.concat('/policy/policy-add'), requestBody)


    // Assuming you are making a POST request to your API
    // return this.http.post<any>(`${this.apiUrl}/add-policy`, requestBody);
  }
// }


  Registeredclients(){
    return this.http.post<any>(env.apiHost.concat('/registration/client-reg-list'),{});

}
Registeredstatusclients(){
  return this.http.post<any>(env.apiHost.concat('/registration/client-status-list'),{});
  
}

policyBulkUpload(formData: any){
  return this.http.post<any>(env.apiHost.concat('/policy/policy-bulk'),formData);
  
}

urlAddition(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/url-addition'),search_term);
}

urlDeletion(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/url-deletion'),search_term);
}

ipAddition(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/ip-addition'),search_term);
}

ipDeletion(search_term:any){
  return this.http.post<any>(env.apiHost.concat('/policy/ip-deletion'),search_term);
}

serverPolicyVersion(){
  return this.http.post<any>(env.apiHost.concat('/policy/server-policy-version'),{});
}

serverPatchVersion(){
  return this.http.post<any>(env.apiHost.concat('/policy/server-patch-version'),{});
}

allServerPolicyVersion(){
  return this.http.post<any>(env.apiHost.concat('/policy/all-server-policy-version'),{});
}

allServerPatchVersion(){
  return this.http.post<any>(env.apiHost.concat('/policy/all-server-patch-version'),{});
}

policyStatusChange(policyStatus:any){
  return this.http.post<any>(env.apiHost.concat('/policy/policy-status-change'),policyStatus);
}

editUnit(unitDetails:any){
  return this.http.post<any>(env.apiHost.concat('/usermgt/edite-unit'),unitDetails);
}

deleteUnit(unitDetails:any){
  return this.http.post<any>(env.apiHost.concat('/usermgt/delete-unit'),unitDetails);
}

policyUrlDetails(policyUrlDetail:any){
  return this.http.post<any>(env.apiHost.concat('/policy/url-details'),policyUrlDetail);
}

policyIpDetails(policyIpDetails:any){
  return this.http.post<any>(env.apiHost.concat('/policy/ip-details'),policyIpDetails);
}



policyver(){
return this.http.post<any>(env.apiHost.concat('/policy/policy-updated-status'),{});

}

patchver(){
return this.http.post<any>(env.apiHost.concat('/policy/patch-updated-status'),{});

}

clientreg(): Observable<any> {
   
  return this.http.post(env.apiHost.concat('/registration/total-client-reg'), {})

}

}
