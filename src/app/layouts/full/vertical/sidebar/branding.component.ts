import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- <div class="branding d-none d-lg-flex align-items-center">
      <a [routerLink]="['/dashboards/dashboard']" class="d-flex" style="text-decoration: none; ">
        <img
          src="./assets/images/logo.png"
          class="align-middle m-2"
          alt="logo"
          style= "height: 40px; "
        />
  

    <div>Internet Security </div>
    <div>Operation centre</div>


      </a>
    </div> -->
    <div class="branding d-none d-lg-flex align-items-center">
      <a
        [routerLink]="['/dashboards/dashboard']"
        class="d-flex"
        style="text-decoration: none;"
      >
        <img
          src="./assets/images/logo.png"
          class="align-middle m-2"
          alt="logo"
          style="height: 40px;"
        />
        <div
          style="margin-left: 18px; width: 200px !important; overflow: hidden; white-space: nowrap;"
        >
          <span style="color: white; display: block; text-overflow: ellipsis;text-align: center;"
            >Internet Security</span
          >
          <span style="color: white; display: block; text-overflow: ellipsis;text-align: center;"
            >Operation Centre</span
          >
        </div>
      </a>
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
}
