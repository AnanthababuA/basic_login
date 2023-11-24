import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-client-administraion',
  templateUrl: './client-administraion.component.html',
  styleUrls: ['./client-administraion.component.scss']
})
export class ClientAdministraionComponent {
  formNo: any 
  clientStatus(i: any){
    this.formNo = i
    const clientPageTitle = document.getElementById("clientPageTitle") as HTMLElement | null; 
if (clientPageTitle) {
  clientPageTitle.style.display = 'none';
}

const clientPageContent = document.getElementById("clientPageContent") as HTMLElement | null; 
if (clientPageContent) {
  clientPageContent.style.display = 'block'; 
}

    console.log( "clicked card", i);
    
    
  }

}
