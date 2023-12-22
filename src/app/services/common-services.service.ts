import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonServicesService {
  private triggerClientStatus = new Subject<number>();
  triggerClientStatus$ = this.triggerClientStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  triggerClientStatusFunction(status: number) {
    this.triggerClientStatus.next(status);
    console.log(' in service --0');
  }

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
    return this.http.post(
      env.apiHost.concat('/registration/create-unit'),
      createUnit
    );
  }

  createLocalAdmin(createLocalUnit: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/usermgt/create-local-user'),
      createLocalUnit
    );
  }

  updateLocalAdmin(createLocalUnit: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/updateLocalUnit'),
      createLocalUnit
    );
  }

  unitNameLocalAdmin(): Observable<any> {
    return this.http.post(env.apiHost.concat('/usermgt/get-unit-details'), {});
  }

  unitTypeLocalAdmin(): Observable<any> {
    return this.http.post(env.apiHost.concat('/usermgt/get-user-type'), {});
  }

  UnitDetails(): Observable<any> {
    return this.http.post(env.apiHost.concat('/usermgt/unit-details'), {});
  }

  policySummary(): Observable<any> {
    return this.http.post(env.apiHost.concat('/policy/policy-summary'), {});
  }

  // addPolicy(policyDeail: any): Observable<any> {

  //   return this.http.post(env.apiHost.concat('/policy/policy-add'), policyDeail)

  // }

  addPolicy(policyvalue: any, policytype: any): Observable<any> {
    const requestBody = {
      policyvalue: policyvalue,
      policytype: policytype,
    };

    return this.http.post(
      env.apiHost.concat('/policy/policy-add'),
      requestBody
    );

    // Assuming you are making a POST request to your API
    // return this.http.post<any>(`${this.apiUrl}/add-policy`, requestBody);
  }
  // }

  Registeredclients() {
    return this.http.post<any>(
      env.apiHost.concat('/registration/client-reg-list'),
      {}
    );
  }

  Registeredstatusclients() {
    return this.http.post<any>(
      env.apiHost.concat('/registration/client-status-list'),
      {}
    );
  }

  policyBulkUpload(formData: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/policy-bulk'),
      formData
    );
  }

  urlAddition(search_term: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/url-addition'),
      search_term
    );
  }

  urlDeletion(search_term: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/url-deletion'),
      search_term
    );
  }

  ipAddition(search_term: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/ip-addition'),
      search_term
    );
  }

  ipDeletion(search_term: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/ip-deletion'),
      search_term
    );
  }

  serverPolicyVersion() {
    return this.http.post<any>(
      env.apiHost.concat('/policy/server-policy-version'),
      {}
    );
  }

  serverPatchVersion() {
    return this.http.post<any>(
      env.apiHost.concat('/policy/server-patch-version'),
      {}
    );
  }

  allServerPolicyVersion() {
    return this.http.post<any>(
      env.apiHost.concat('/policy/all-server-policy-version'),
      {}
    );
  }

  allServerPatchVersion() {
    return this.http.post<any>(
      env.apiHost.concat('/policy/all-server-patch-version'),
      {}
    );
  }

  policyStatusChange(policyStatus: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/policy-status-change'),
      policyStatus
    );
  }

  editUnit(unitDetails: any) {
    return this.http.post<any>(
      env.apiHost.concat('/usermgt/edite-unit'),
      unitDetails
    );
  }

  deleteUnit(unitDetails: any) {
    return this.http.post<any>(
      env.apiHost.concat('/usermgt/delete-unit'),
      unitDetails
    );
  }

  policyUrlDetails(policyUrlDetail: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/url-details'),
      policyUrlDetail
    );
  }

  policyIpDetails(policyIpDetails: any) {
    return this.http.post<any>(
      env.apiHost.concat('/policy/ip-details'),
      policyIpDetails
    );
  }

  policyver() {
    return this.http.post<any>(
      env.apiHost.concat('/policy/policy-updated-status'),
      {}
    );
  }

  patchver() {
    return this.http.post<any>(
      env.apiHost.concat('/policy/patch-updated-status'),
      {}
    );
  }

  clientreg(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/total-client-reg'),
      {}
    );
  }

  logReceivedDashboard(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/log-received-dash'),
      {}
    );
  }

  clamAvUpdatedDashboard(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/clamav-updated-dash'),
      {}
    );
  }

  clientInfo(clientInfo: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/client-info'),
      clientInfo
    );
  }

  loginfo() {
    return this.http.post<any>(
      env.apiHost.concat('/logviewer/get-log-desc'),
      {}
    );
  }

  alertinfo() {
    return this.http.post<any>(
      env.apiHost.concat('/registration/alert-day-stats'),
      {}
    );
  }

  lastcomalerts() {
    return this.http.post<any>(
      env.apiHost.concat('/registration/last-com-alert'),
      {}
    );
  }


  lastcomalertdetails() {
    return this.http.post<any>(
      env.apiHost.concat('/registration/last-com-list'),
      {}
    );
  }

  alertcontent() {
    return this.http.post<any>(
      env.apiHost.concat('/registration/alert-content'),
      {}
    );
  }


  alertstatus(params: any) {
    return this.http.post<any>(
      env.apiHost.concat('/registration/alert-range-stats'),
      params
    );
  }

  
  dashboardAllRegisteredClient(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/all-client-reg-list'),
      {}
    );
  }

  dashboardOTPStatus(dateRange: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/otp-stats-dash'),
      dateRange
    );
  }

  dashboardPatchUpdateDetails(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/policy/patch-updated-details'),
      {}
    );
  }

  dashboardPoliccyUpdateDetails(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/policy/policy-updated-details'),
      {}
    );
  }

  dashboardClamAvUpdateDetails(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/clamav-updated-details'),
      {}
    );
  }

  dashboardLogReceivedDetails(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/log-received-details'),
      {}
    );
  }

  dashboardRegistrationStatus(dateRange: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/reg-stats-dash'),
      dateRange
    );
  }

  dashboardDeletedClients(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/delete-client-count'),
      {}
    );
  }

  dashboardBlockClients(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/block-client-count'),
      {}
    );
  }

  listofclients(params: any) {
    return this.http.post<any>(
      env.apiHost.concat('/logviewer/client-lists'),
      params
    );
  }

  hierarchy(): Observable<any> {
    return this.http.post(env.apiHost.concat('/usermgt/unit-hierarchy'), {});
  }

  deletedClientList(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/delete-client-list'),
      {}
    );
  }

  deletedClient(clientData: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/delete-client'),
      clientData
    );
  }

  blockClient(clientData: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/block-client'),
      clientData
    );
  }

  blockClientList(): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/block-client-list'),
      {}
    );
  }

  unBlockClient(clientData: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/registration/unblock-client'),
      clientData
    );
  }

  logfiles(params: any) {
    return this.http.post<any>(
      env.apiHost.concat('/logviewer/search-log'),
      params
    );
    }
}
