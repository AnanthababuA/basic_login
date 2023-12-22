import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  // templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="spinner-wrapper"  [ngStyle]="{'display': showSpinner ? 'block' : 'none'}" style="">
      <div class="spinner" [ngClass]="{ 'show-spinner': showSpinner }">
        <!-- <img src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif" alt="Image Not Found"  style="max-height: 250px; border: 1px solid red"> -->
        <mat-spinner diameter="70"></mat-spinner>
      </div>
    </div>
  `,
  styles: [`
    .show-spinner {
      display: block;
    }
    .spinner-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
  `]
})
export class SpinnerComponent {

  @Input() showSpinner: boolean = false;
  
}
