import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
// import { RegistrationserviceService } from 'src/app/services/registrationservice.service';
import Swal from 'sweetalert2';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-listregclient',
  templateUrl: './listregclient.component.html',
  styleUrls: ['./listregclient.component.scss']
})
export class ListregclientComponent {

  show:boolean=false; 
  displayStyle:string='none'



  data:any;
  displayedColumns = ['SNo', 'ClientName', 'MacID', 'Unit','IP','LastCommunicationtime','RegStatus'];
  dataSources:any
    // @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  constructor( private common: CommonServicesService,breakpointObserver: BreakpointObserver) {
    
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['ID', 'ClientName', 'MacID', 'Unit','IP','LastCommunicationtime','RegStatus']
        : ['ID', 'ClientName', 'MacID', 'Unit','IP','LastCommunicationtime','RegStatus'];
    });
  }
  ngOnInit() {

    
        this.common.Registeredclients().subscribe((res) => {


          if (res.api_status === true) {

            this.dataSources = new MatTableDataSource(res.data);  
            console.log("data",this.dataSources)
            this.dataSources.paginator = this.paginator;
          
           }
           else {

            Swal.fire({
              title: 'Unable to load Date',
              text: '',
              icon: 'info'
            })

          }
        });
       
    
  }
   
  ngAfterViewInit(): void {
   
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();
  }

}
