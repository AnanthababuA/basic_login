import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DescriptiveService {

  constructor(private http: HttpClient) { }

  getDescQPUploadEvents(page_no: number, start_date: any = '', end_date: any = '', search_term: string = '', std: string = ''): Observable<any> {

    let params = `page_size=8&page=${page_no}`;

    if(start_date) {
      params += `&start_date=${start_date}`
    }

    if(end_date) {
      params += `&end_date=${end_date}`
    }

    if(search_term) {
      params += `&search_term=${search_term}`
    }

    if(std) {
      params += `&class_std=${std}`
    }

    return this.http.post<any>(`${env.apiHost}/scheduler/descriptive-qp-upload-list?${params}`, {})

  }

  getDescQPDownloadEvents(page_no: number, start_date: any = '', end_date: any = '', search_term: string = '', std: string = ''): Observable<any> {

    let params = `page_size=8&page=${page_no}`;

    if(start_date) {
      params += `&start_date=${start_date}`
    }

    if(end_date) {
      params += `&end_date=${end_date}`
    }

    if(search_term) {
      params += `&search_term=${search_term}`
    }

    if(std) {
      params += `&class_std=${std}`
    }

    return this.http.post<any>(`${env.apiHost}/scheduler/descriptive-qp-download-list?${params}`, {})

  }


  downloadQuestionPaper(schedule_id: any): Observable<any> {

    return this.http.post<any>(env.apiHost.concat('/scheduler/descriptive-download'), { schedule_id: schedule_id }, )

  }

  uploadQP(formData: any): Observable<any> {

    return this.http.post<any>(env.apiHost.concat('/scheduler/descriptive-upload'), formData)

  }

  getDescFeedbackEvents(page_no: number, start_date: any = '', end_date: any = '', search_term: string = '', std: string = ''): Observable<any> {

    let params = `page_size=8&page=${page_no}`;

    if(start_date) {
      params += `&start_date=${start_date}`
    }

    if(end_date) {
      params += `&end_date=${end_date}`
    }

    if(search_term) {
      params += `&search_term=${search_term}`
    }

    if(std) {
      params += `&class_std=${std}`
    }

    return this.http.post<any>(`${env.apiHost}/scheduler/descriptive-qp-feeback-list?${params}`, {})

  }

  submitFeedback(feedback: any): Observable<any> {

    return this.http.post<any>(env.apiHost.concat('/scheduler/feed-back-form') ,feedback)

  }

  getEventList(page_no: number, start_date: any = '', end_date: any = '', search_term: string = '', std: string = ''): Observable<any> {

    let params = `page_size=8&page=${page_no}`;

    if(start_date) {
      params += `&start_date=${start_date}`
    }

    if(end_date) {
      params += `&end_date=${end_date}`
    }

    if(search_term) {
      params += `&search_term=${search_term}`
    }

    if(std) {
      params += `&class_std=${std}`
    }

    return this.http.post<any>(`${env.apiHost}/scheduler/all-events-list?${params}`, {})

  }

  getEventSummaryList(page_no: number, start_date: any = '', end_date: any = '', search_term: string = '', std: string = ''): Observable<any> {

    let params = `page_size=8&page=${page_no}`;

    if(start_date) {
      params += `&start_date=${start_date}`
    }

    if(end_date) {
      params += `&end_date=${end_date}`
    }

    if(search_term) {
      params += `&search_term=${search_term}`
    }

    if(std) {
      params += `&class_std=${std}`
    }

    return this.http.post<any>(`${env.apiHost}/scheduler/event-summary-list?${params}`, {})

  }

  revertDescQP(params: any): Observable<any> {

    return this.http.post<any>(`${env.apiHost}/exammgt/delete-descriptive-qp-uploaded`, params)

  }

}

