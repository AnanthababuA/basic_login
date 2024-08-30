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

  
  

}
