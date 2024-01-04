import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrandingComponent, } from '../sidebar/branding.component';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { LastCommuniAlertpopComponent } from 'src/app/pages/dashboards/dashboard1/last-communi-alertpop/last-communi-alertpop.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TotalActiveClientListComponent } from './total-active-client-list/total-active-client-list.component';
import { AlertContentComponent } from 'src/app/pages/dashboards/dashboard1/alert-content/alert-content.component';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface msgs {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule, NgForOf],
  templateUrl: 'search-dialog.component.html',
  styleUrls: ['header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  
  componentName : any

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });
}



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgScrollbarModule, TablerIconsModule, MaterialModule, BrandingComponent, NgFor, NgIf, AppSearchDialogComponent ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  lastalert_count: any;
  totalActiveClients: any;
  alert_count:any

  showFiller = false;

  userName = this.ts.getUser();

  userType = this.ts.getUserType()

  

  
  componentName: typeof LastCommuniAlertpopComponent;

  constructor(
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private ts: TokenStorageService, private router: Router, private auth: AuthService, private cs: CommonServicesService
    
  ) {
    translate.setDefaultLang('en');
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


 
    logout(){
      // console.log("log out...");
      
      this.auth.isLogin = false;
  
      this.ts.signOut();
  
      this.router.navigate(['/authentication/login']);
  
    }
  


  ngOnInit(): void {

    // console.log("userName log...", this.capitalizeFirstLetter(this.userName));
    this.userName = this.capitalizeFirstLetter(this.userName)

    this.userType = this.formatUserName(this.userType)
    // console.log("userType log...", this.userType);

    // console.log("userName log...", this.userName);
    // console.log("userType log 99999...", this.formatUserName(this.userType));

    this.lastalert();
    this.totalActiveClientApi()
    this.alertAPI()
    
  }


// Function to capitalize the first letter of a string
 capitalizeFirstLetter(str: string): string {
  return str.toUpperCase() 
}

 formatUserName(str: string): string {
  const formattedString = str.replace(/_/g, ' '); // Replace underscores with spaces
  return formattedString.toUpperCase() 

  // return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);

}

lastalert(){
  this.cs.lastcomalerts().subscribe( (res) => {

    console.log('res', res);

    if(res.api_status == true){
      this.lastalert_count = res.count;
      console.log('last count', this.lastalert)
    }

  }
  );
}

totalActiveClientApi() {
  this.cs.totalActiveClients().subscribe(
    (res) => {
      if (res.api_status) {

        this.totalActiveClients = res.reg_count;
        console.log('success changed');
console.log("total count", res, this.totalActiveClients);

      } else {
        
      }
    },
    (err) => {
      console.log('Error: ', err);
    }
  );

 
}

totalActiveClientList() {
  

  const dialogRef = this.dialog.open(TotalActiveClientListComponent);

  dialogRef.afterClosed().subscribe((result) => {
  });
}

alertAPI(){

  this.cs.alertinfo().subscribe( (res) => {
  

    console.log('res alert', res)

    if(res.api_status == true)
    {
      this.alert_count = res.total_count;

      console.log("alert count", this.alert_count
      
      
      
      );
      
    }
  }

  );
}

alertContentPopUp(){
  const dialogRef = this.dialog.open(AlertContentComponent);

  dialogRef.afterClosed().subscribe((result) => {
  });
}


openDialogPolicy(componentName : any) {
  const dialogRef = this.dialog.open(componentName);

  dialogRef.afterClosed().subscribe((result) => {
  });
}

lastcommun(){
  console.log("last communication")
  
  console.log("last communication alert function")
  this.componentName = LastCommuniAlertpopComponent;
  this.openDialogPolicy(this.componentName)
}

changePassword(){
  console.log("change password");

  // this.componentName = ChangePasswordComponent;
  // this.openDialogPolicy(this.componentName)

  this.openDialogChangePass()
  
  }

  openDialogChangePass() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  
}

}