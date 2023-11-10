import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
// import { RegistrationserviceService } from 'src/app/services/registrationservice.service'
import Swal from 'sweetalert2';
import { CommonServicesService } from 'src/app/services/common-services.service';


@Component({
  selector: 'app-regstatusclient',
  templateUrl: './regstatusclient.component.html',
  styleUrls: ['./regstatusclient.component.scss']
})
export class RegstatusclientComponent {
  displayedColumns =['ID', 'ClientName', 'MacID', 'Unit','Log','Policy','Clam','Patch', 'PolicyStatus', 'PatchStatus']
  ;
  // dataSource: MatTableDataSource<UserData>;
  dataSources:any
  // ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
            
  
  constructor(private common: CommonServicesService,breakpointObserver: BreakpointObserver) {
    
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['ID', 'ClientName', 'MacID', 'Unit','Log','Policy','Clam','Patch','PolicyStatus', 'PatchStatus']

        : ['ID', 'ClientName', 'MacID', 'Unit','Log','Policy','Clam','Patch', 'PolicyStatus', 'PatchStatus'];
    });
  }
  ngOnInit() {
    this.common.Registeredstatusclients().subscribe((res) => {
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
applyFilter(event: Event) {
  // const filterValue = (event.target as HTMLInputElement).value;
  // this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
