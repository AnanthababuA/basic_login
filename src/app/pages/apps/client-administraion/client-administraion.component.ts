import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-client-administraion',
  templateUrl: './client-administraion.component.html',
  styleUrls: ['./client-administraion.component.scss'],
})
export class ClientAdministraionComponent {
  formNo: any;
  userType = this.ts.getUserType()


  clientStatus(i: any) {

    console.log("fform ssi", i);
    
    this.formNo = i;
    const clientPageTitle = document.getElementById(
      'clientPageTitle'
    ) as HTMLElement | null;
    if (clientPageTitle) {
      clientPageTitle.style.display = 'none';
    }

    const clientPageContent = document.getElementById(
      'clientPageContent'
    ) as HTMLElement | null;
    if (clientPageContent) {
      clientPageContent.style.display = 'block';
    }

    // console.log('clicked card', i);
  }

  // ngAfterViewInit() {
  //   this.common.triggerClientStatus$.subscribe((status: number) => {
  //     this.clientStatus(1); // Call clientStatus function with the received parameter
  //     console.log("ng after dashboard to client");

  //     const clientPageTitle = document.getElementById(
  //       'clientPageTitle'
  //     ) as HTMLElement | null;
  //     console.log("page", clientPageTitle);
      
  //     if (clientPageTitle) {
  //       clientPageTitle.style.display = 'none';
  //     }
  
  //     const clientPageContent = document.getElementById(
  //       'clientPageContent'
  //     ) as HTMLElement | null;

  //     console.log("conent", clientPageContent);
      
  //     if (clientPageContent) {
  //       clientPageContent.style.display = 'block';
  //     }

      
  //   });
  // }

  @ViewChild('registeredClientsBtn') registeredClientsBtn!: ElementRef;

  // Function to programmatically trigger button click
  triggerButtonClick() {
    if (this.registeredClientsBtn) {
      // Access the native element and simulate a click
      (this.registeredClientsBtn.nativeElement as HTMLElement).click();
    }
  }

  ngAfterViewInit() {
    this.common.triggerClientStatus$.subscribe((status: number) => {

      console.log("tirgger click");
      // Get reference to the div element
      setTimeout(() => {
        
        const myDiv = document.getElementById('myDiv');
        // Check if the element exists
        if (myDiv) {
          // Create and trigger a click event
          console.log("in div");
          
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
        
          // Dispatch the click event on the div
          myDiv.dispatchEvent(clickEvent);
        }else{
          console.log("in the elsee");
          
        }
      }, 500);


      
      // // this.clientStatus(1); // Call clientStatus function with the received parameter
      // // this.formNo = 1;
      // console.log("form is", this.formNo);
      
      // console.log("ng after dashboard to client");
  
      // // Use setTimeout to delay the code execution
      // setTimeout(() => {
      // this.formNo = 1;

      //   const clientPageTitle = document.getElementById(
      //     'clientPageTitle'
      //   ) as HTMLElement | null;
      //   console.log("page", clientPageTitle);
        
      //   if (clientPageTitle) {
      //     clientPageTitle.style.display = 'none';
      //   }
    
      //   const clientPageContent = document.getElementById(
      //     'clientPageContent'
      //   ) as HTMLElement | null;
  
      //   // console.log("content", clientPageContent);
        
      //   if (clientPageContent) {
      // this.formNo = 1;

      //     clientPageContent.style.display = 'block';
      //   }
      //   // // this.clientStatus(1); // Call clientStatus function with the received parameter
        
      //   // Use Renderer2 to manipulate elements and trigger click
      // if (this.registeredClientsBtn && this.registeredClientsBtn.nativeElement) {
      //   this.renderer.setStyle(this.registeredClientsBtn.nativeElement, 'display', 'none');
      //   // Trigger a click event on the button
      //   this.formNo = 1;
      //   this.renderer.selectRootElement(this.registeredClientsBtn.nativeElement).click();
      // }
    

      // });
    });
  }
  

  constructor(
    private common: CommonServicesService,private renderer: Renderer2, private ts: TokenStorageService,
  ) {}


}
