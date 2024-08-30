import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  username: any;
  udisecode: any;
  schoolname: any;
  standard: any;
  section: any;

  constructor(private router: Router, private auth: AuthService, private tokenStorage: TokenStorageService,) {}

  ngOnInit(){
    // var val = this.dbs.getStoredValues()

    var val = this.tokenStorage.getStoredValues();

    console.log("values", val);

    const token_val = this.tokenStorage.getToken()


    console.log("tocken value", token_val);

    if(token_val != null){
      const us_na = this.tokenStorage.getUsername(token_val);
      console.log("usen name", us_na)
    }

    if(token_val != null){
      const toke_exp = this.tokenStorage.handleTokenExpiration(token_val);
      console.log("usen name time value", toke_exp)
    }

       

    this.username = val.user_name;

    this.udisecode = val.udise_code;
    this.schoolname = val.school_name;

    this.standard = val.standard;
    this.section = val.class_section;

  }

}
