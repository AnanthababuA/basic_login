import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  
    scheduleUpdateId: any = ''
  
    schedulesList: any = [];
  
    restrictDays: number = 3;
  
    constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
  
    getOptionsData(): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/event-type-status'), {});
  
    }
  
    getParticipants(type: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants'), type);
  
    }
  
    getSchedules(): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/scheduling'), {});
  
    }
  
    createSchedule(eventDet: any): Observable<any> {
  
      const formattingData = this.getFormatted(eventDet);
  
      return this.http.post(env.apiHost.concat('/scheduler/scheduling-create'), formattingData);
  
    }
  
    mapParticipants(participants: any, sid: any): Observable<any> {
  
      let participantsList: any = {
        schedule_id: sid,
        participants: participants
      };
  
      // console.log(participantsList);
  
      return this.http.post(env.apiHost.concat('/scheduler/map-participants'), participantsList);
  
    }
  
    getFormatted(eventDet: any): any {
  
      let formattedData: any = {};
  
      formattedData['event_title'] = eventDet.title;
      formattedData['event_type_id'] = eventDet.type;
      formattedData['event_location'] = eventDet.location;
      formattedData['school_type'] = eventDet.schtype;
      formattedData['event_colour'] = eventDet.color;
      formattedData['class_std'] = eventDet.classStd;
      formattedData['class_section'] = eventDet.section;
      formattedData['class_group'] = eventDet.stream;
      formattedData['class_subject'] = eventDet.subject;
      formattedData['class_medium'] = eventDet.medium;
      formattedData['event_is_allday'] = eventDet.isAllDay;
      formattedData['event_startdate'] = eventDet.startDate;
      formattedData['event_enddate'] = eventDet.endDate;
      formattedData['event_starttime'] = eventDet.startTime;
      formattedData['event_endtime'] = eventDet.endTime;
      formattedData['repeat'] = eventDet.repeat;
      formattedData['batch_count'] = eventDet.batchs;
      formattedData['pcategory'] = eventDet.pCategory;
      formattedData['is_1_n'] = eventDet.is_1_n;
      formattedData['allowed_allocation_id'] = eventDet.allowed_allocation_id;
      formattedData['competitive_exam'] = eventDet.competitive_exam;
      console.log(formattedData);
  
      return formattedData;
  
    }
  
    searchParticipants(term: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants'), term);
  
    }
  
    updateSchedule(eventDet: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/scheduling-update'), eventDet);
  
    }
  
    deleteSchedule(eventID: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/scheduling-delete'), { schedule_id: eventID });
  
    }
  
    getScheduleById(eventID: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-schedule'), { schedule_id: eventID });
  
    }
  
    getStreamSubject(subjectData: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/student-subject'), subjectData);
  
    }
  
    getClass(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-std-schooltype'), params);
      
    }
  
    getDistricts(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-all-district'), params);
  
    }
    getDist(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-district'), params);
  
    }
  
    getBlocks(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-all-block'), params);
  
    }
  
    getBlk(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-block'), params);
  
    }
  
    getSchools(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-all-school'), params);
  
    }
  
    getSchl(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-school'), params);
  
    }
  
    getStudents(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/scheduler/get-participants-student'), params);
  
    }
  
    checkUpdatePermission(params: any): Observable<any> {
  
      return this.http.post(env.apiHost.concat('/exammgt/event-edit-delete'), params);
  
    }
  
  
    getDetailedSummary(eventID: any): Observable<any> {
  
      return this.http.post<any>(env.apiHost.concat('/exammgt/event-details'), { event_id: eventID })
  
    }
  
    getcaleventdetails(params: any): Observable<any> {
      // console.log('params', params)
      return this.http.post(env.apiHost.concat('/scheduler/cal-events-list'), params);
    }
  
    getdayeventdetails(params: any): Observable<any> {
      // console.log('params', params)
      return this.http.post(env.apiHost.concat('/scheduler/day-events-list'), params);
    }
  
    getAuthorName(event_id: any): Observable<any> {
  
      return this.http.post<any>(`${env.apiHost}/exammgt/event-author`, {event_id: event_id})
  
    }

    
  
    getAuthor(event: any) {
  
      this.spinner.show();
  
      this.getAuthorName(event.schedule_id).subscribe((res) => {
  
        this.spinner.hide();
  
        if(res.api_status === true) {
  
          Swal.fire({
            title: `Author for the event ID: ${event.schedule_id}`,
            html: `<h3 class="text-success">${res.data.name_text} - ${res.data.username}</h3>`,
            showCloseButton: true
          });
  
        }
      })
    }
  
  }