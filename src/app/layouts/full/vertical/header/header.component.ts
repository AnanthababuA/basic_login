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
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  lastalert: any;

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

  showFiller = false;

  userName = this.ts.getUser();

  userType = this.ts.getUserType()

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];
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
  

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'New message received',
      subtitle: 'Salma sent you new message',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'New Payment received',
      subtitle: 'Check your earnings',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly completed tasks',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
  ];

  msgs: msgs[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Andrew McDownland',
      subtitle: 'Message blocked. Try Again',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'Christopher Jamil',
      subtitle: 'This message cannot be sent',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'Julia Roberts',
      subtitle: 'You are trying to reach location.',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'James Johnson',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Maria Rodriguez',
      subtitle: 'Congrats for your success',
    },
  ];

  profiledd: profiledd[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-account.svg',
      title: 'My Profile',
      subtitle: 'Account Settings',
      link: '/',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-inbox.svg',
      title: 'My Inbox',
      subtitle: 'Messages & Email',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-tasks.svg',
      title: 'My Tasks',
      subtitle: 'To-do and Daily Tasks',
      link: '/apps/taskboard',
    },
  ];

  ngOnInit(): void {

    // console.log("userName log...", this.capitalizeFirstLetter(this.userName));
    this.userName = this.capitalizeFirstLetter(this.userName)

    this.userType = this.formatUserName(this.userType)
    // console.log("userType log...", this.userType);

    // console.log("userName log...", this.userName);
    // console.log("userType log 99999...", this.formatUserName(this.userType));

    this.lastalert();
    
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
      this.lastalert = res.count;
      console.log('last count', this.lastalert)
    }

  }
  );
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

}