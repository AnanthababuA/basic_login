import { Component } from '@angular/core';

import { NgForOf } from '@angular/common';
// import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// import { AppSalesOurVisitorsComponent as AppSalesOurVisitorsComponent } from "../../../components/dashboard1/our-visitors/our-visitors.component";

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
  imports: [
    MatIconModule,
    MatNativeDateModule,
    CommonModule,
    MatCardModule,
   TablerIconsModule
  ],
})
export class AppDashboard1Component {
  reg_count: any;
  policy_ver: any;
  patch_ver: any;

  pol_tot_cli: any;
  pol_upd_cli: any;
  pat_tol_cli: any;
  pat_upd_cli: any;

  pol_per_val: any;
  pat_per_val: any;

  alert_count: any;

  clamAvData: any;
  logRecievedData: any;

  deletedClientCount: any;
  blockedClientdCount: any;

  componentName: any;

  totalActiveClients: any;

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
     
  }

  



 
  isSpinnerVisible: { [key: string]: boolean } = {};

 


}
