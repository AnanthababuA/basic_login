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

  userDetails: any;

  showFiller = false;

  userName = this.ts.getUser();

  // userType = this.ts.getUserType()


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
//  this.userName = this.capitalizeFirstLetter(this.userName)

//  this.userType = this.formatUserName(this.userType)
//  console.log("this user", this.userType);
 }


// Function to capitalize the first letter of a string
//  capitalizeFirstLetter(str: string): string {
//   return str.toUpperCase() 
// }

//  formatUserName(str: string): string {
//   const formattedString = str.replace(/_/g, ' '); // Replace underscores with spaces
//   return formattedString.toUpperCase() 

//   // return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);

// }






}