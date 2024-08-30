import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashboardApi = env.dashboardserver;


  district: string;
  blockvalue: string;
  blocklist: any;
  classvalues:any;
  startDat:any;
  endDat:any;

  // url = `http://httpbin.org/post `;
  constructor(
    private http: HttpClient,
    // private modalService: NgbModal,
    ) { }

  getCountOfCurrentEvents(): Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/schedule_count/'),{});
  }


  getCountOfUpcomingEvents(): Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/schedule_count/'),{});
  }

  getCountOfPendingEvents(): Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/schedule_count/'),{});
  }

  getCountOfRecentEvents(): Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/schedule_count/'),{});
  }

  getCurrentEvents() { //: Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/event/'),{});
  }

 
  getUpcomingEvents() { //: Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/event/'),{});
  }


  getPendingEvents() { //: Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/event/'),{});
  }

  getRecentEvents() { //: Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/event/'),{});
  }

   // Store values in localStorage
   storeValues(dict_details: any, blck_details: any, clas_details: any, sdate_details: any, edate_details: any) {
    localStorage.setItem('dict_details', JSON.stringify(dict_details));
    localStorage.setItem('blck_details', JSON.stringify(blck_details));
    localStorage.setItem('clas_details', JSON.stringify(clas_details));
    localStorage.setItem('sdate_details', JSON.stringify(sdate_details));
    localStorage.setItem('edate_details', JSON.stringify(edate_details));
  }

  // Retrieve values from localStorage
  getStoredValues() {
    const dict_details = JSON.parse(localStorage.getItem('dict_details') ?? 'null');
    const blck_details = JSON.parse(localStorage.getItem('blck_details') ?? 'null');
    const clas_details = JSON.parse(localStorage.getItem('clas_details') ?? 'null');
    const sdate_details = JSON.parse(localStorage.getItem('sdate_details') ?? 'null');
    const edate_details = JSON.parse(localStorage.getItem('edate_details') ?? 'null');
    return { dict_details, blck_details, clas_details, sdate_details, edate_details };
  }

  getDist(id:any){
    return this.http.post<any>(env.apiHost.concat('/dashboard/district-list'),{});
  }

  getBlock(distid: any){
    return this.http.post<any>(env.apiHost.concat('/dashboard/block-list'),{district_id:distid});
  }

  descriptivesmry(params:any): Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/descriptive-summary'),params)
  }

  descriptivesumryschool(params:any): Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/school-descriptive-status'),params)
  }


  descriptivesumryschoolfeedback(params:any): Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/feedback-raw-data'),params)
  }
  
  
  offlinesummary(params:any):Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/offline-mcq-summary'),params)
  }
  
  offlinebar(params:any): Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/mcq-district-wise-status'),params)
  }
  offlinetable(params:any): Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/mcq-schools-wise-status'),params)
  }

  descriptivedistsummary(params:any):Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/download-summary-district-wise'),params)
  }

  mcqschoollevel(params:any):Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/mcq-school-events'),params)
  }

  descriptivedistschool(params:any):Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/dashboard/descriptive-deparment'),params)
  }

  getlistofevent(params: any): Observable<any> {
    // console.log('params', params)
   return this.http.post(env.apiHost.concat('/events/events-list'), params); 
}





getdistrict_details(){
  return this.http.post<any>(this.dashboardApi.concat('/dashboard/districts_list'),{});
}

getblock_details(district_id: any){
  return this.http.post<any>(this.dashboardApi.concat('/dashboard/blocks_list'),{district_id});
}

getschoolcate_details(){
  return this.http.post<any>(this.dashboardApi.concat('/dashboard/school_type'),{});
}

getschooltype_details(){
  return this.http.post<any>(this.dashboardApi.concat('/dashboard/school_cate_type'),{});
}

getevent_details(params: any){
  return this.http.post<any>(this.dashboardApi.concat('/events/event_details'),params);
}

getdistrictwise_status(params: any){
  return this.http.post<any>(this.dashboardApi.concat('/events/districtwise_status'),params);
}

getblockwise_status(params: any){
  return this.http.post<any>(this.dashboardApi.concat('/events/blockwise_status'),params);
}


  
}