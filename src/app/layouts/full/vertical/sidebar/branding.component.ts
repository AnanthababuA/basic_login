import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding d-none d-lg-flex align-items-center">
      <a [routerLink]="['/dashboards/dashboard1']" class="d-flex" style="text-decoration: none; ">
        <img
          src="./assets/images/logo.png"
          class="align-middle m-2"
          alt="logo"
          style= "height: 40px; "
        />
    <h1 
    style="margin-left: 20px; 
    font-weight: bold;
    color: white;
    text-align: center;
    align-self: center;
    font-size: 2rem;">ISOC</h1>

      </a>
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
}
