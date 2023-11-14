import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-policy-update',
  templateUrl: './policy-update.component.html',
  styleUrls: ['./policy-update.component.scss']
})
export class PolicyUpdateComponent {
  loaderStatus: string = 'loading...';
  showEventTable: boolean = true;
  dtOptions: any = {};

  // allowedUrl :any

  // blockedUrl: any
  allowedUrl: string[] = [];
  blockedUrl: string[] = [];

  // selectedItems: string[] = []; // Initialize an array to hold selected items
  selectedAllowedItems: string[] = []; // Initialize an array to hold selected allowed items
  selectedBlockedItems: string[] = []; // Initialize an array to hold selected blocked items
  

  // search 
  filteredAllowedUrl: string[] = []; // Initialize filtered allowed URLs as an empty array
searchText: string = '';

blockedSearchText: string = ''; // Holds the search text entered by the user for blocked URLs
filteredBlockedUrl: string[] = []; 


  // In your component class
  data = Array.from({ length: 12 }, (_, index) => ({ unitName: index + 1 }));

  constructor(private common: CommonServicesService, private spinner: NgxSpinnerService) {
  }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'lBfrtip',
      paging: true,
      lengthMenu: [5, 10, 25, 50],

      initComplete: function () {
        $('.button').removeClass('dt-button');
      },
      buttons: [

        {
          extend: 'copy',
          text: '<i class="mdi mdi-content-copy"></i> Copy',
          className: 'bg-success rounded btn-sm btn btn-warning mx-2 text-dark',

        },
        {
          extend: 'print',
          text: '<i class="mdi mdi-printer"></i> Print',
          className: ' bg-warning rounded btn-sm btn btn-primary mx-2 text-dark',
        },

        // {
        //   extend: 'excel',
        //   text: '<i class="mdi mdi-printer"></i> Excel',
        //   className: ' bg-primary rounded btn-sm btn btn-primary mx-2 text-dark',
        // },

        {
          extend: 'csv',
          text: '<i class="mdi mdi-file-table"></i> CSV',
          className: 'bg-error rounded btn-sm btn btn-success  text-dark',
        }
      ]
    };







    console.log("in ng init");

    // this.unitNameLocalAdminfun()

    // this.unitTypeLocalAdminfun()

    
    this.urlAddtionApi()
    this.urlDeletionApi()

    this.filteredAllowedUrl = this.allowedUrl; // Initially set filteredAllowedUrl to allowedUrl
    this.filteredBlockedUrl = this.blockedUrl; // Initially set filteredBlockedUrl to blockedUrl
  }


applyFilter() {
  this.filteredAllowedUrl = this.allowedUrl.filter((item: string) => {
    return item.toLowerCase().includes(this.searchText.toLowerCase());
  });
}

applyBlockedFilter() {
  this.filteredBlockedUrl = this.blockedUrl.filter((item: string) => {
    return item.toLowerCase().includes(this.blockedSearchText.toLowerCase());
  });
}



  tabChanged(event: any) {
    console.log("tab changed", event);
    if (event === 1) {
      console.log("mange unit call");
      // this.showEventTable = false;
    }
  }
 

  urlAddtionApi() {

    console.log();
    this.spinner.show()
    this.common.urlAddition().subscribe((res: any) => {

      console.log("addion subscribe");


      if (res.api_status === true) {
        this.spinner.hide();

        console.log("additon res is  ", res.policy_data);

        this.allowedUrl =  res.policy_data
        this.filteredAllowedUrl = this.allowedUrl;
      } else {

        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        })
      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })
  }

  urlDeletionApi() {

    this.spinner.show()
    this.common.urlDeletion().subscribe((res: any) => {

      console.log("addion subscribe");


      if (res.api_status === true) {
        this.spinner.hide();

        console.log("additon res is  ", res.policy_data);

        this.blockedUrl =  res.policy_data
        this.filteredBlockedUrl = this.blockedUrl; // Initially set filteredBlockedUrl to blockedUrl

      } else {

        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        })
      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })
  }


  // onCheckboxChange(event: any, item: string) {
  //   if (event.target.checked) {
  //     // Checkbox is checked, move item from allowedUrl to blockedUrl
  //     const index = this.allowedUrl.indexOf(item);
  //     if (index !== -1) {
  //       this.allowedUrl.splice(index, 1); // Remove from allowedUrl
  //       this.blockedUrl.push(item); // Add to blockedUrl
  //     }
  //   } else {
  //     // Checkbox is unchecked, move item back from blockedUrl to allowedUrl
  //     const index = this.blockedUrl.indexOf(item);
  //     if (index !== -1) {
  //       this.blockedUrl.splice(index, 1); // Remove from blockedUrl
  //       this.allowedUrl.push(item); // Add to allowedUrl
  //     }
  //   }
  // }
  
  // onSubmit() {
  //   console.log('Allowed URLs:', this.allowedUrl);
  //   console.log('Blocked URLs:', this.blockedUrl);
  //   // Here, you can perform further actions, such as API calls or handling the blocked URLs.
  // }

  

// onCheckboxChange(event: any, item: string, type: string) {
//   if (event.target.checked) {
//     // If checkbox is checked, add the item to respective selectedItems array based on type
//     if (type === 'allowed') {
//       this.selectedAllowedItems.push(item);
//     } else if (type === 'blocked') {
//       this.selectedBlockedItems.push(item);
//     }
//   } else {
//     // If checkbox is unchecked, remove the item from respective selectedItems array based on type
//     if (type === 'allowed') {
//       const index = this.selectedAllowedItems.indexOf(item);
//       if (index !== -1) {
//         this.selectedAllowedItems.splice(index, 1);
//       }
//     } else if (type === 'blocked') {
//       const index = this.selectedBlockedItems.indexOf(item);
//       if (index !== -1) {
//         this.selectedBlockedItems.splice(index, 1);
//       }
//     }
//   }
// }

// onSubmit() {
//   // Move selected items from allowedUrl to blockedUrl
//   for (const selectedItem of this.selectedAllowedItems) {
//     const index = this.allowedUrl.indexOf(selectedItem);
//     if (index !== -1) {
//       this.allowedUrl.splice(index, 1); // Remove from allowedUrl
//       this.blockedUrl.push(selectedItem); // Add to blockedUrl
//     }
//   }

//   // Move selected items from blockedUrl to allowedUrl
//   for (const selectedItem of this.selectedBlockedItems) {
//     const index = this.blockedUrl.indexOf(selectedItem);
//     if (index !== -1) {
//       this.blockedUrl.splice(index, 1); // Remove from blockedUrl
//       this.allowedUrl.push(selectedItem); // Add to allowedUrl
//     }
//   }

//   // Clear selected items arrays after moving items
//   this.selectedAllowedItems = [];
//   this.selectedBlockedItems = [];

//   console.log('Allowed URLs:', this.allowedUrl);
//   console.log('Blocked URLs:', this.blockedUrl);
//   // Here, you can perform further actions, such as API calls or handling the URLs.
// }



onCheckboxChange(event: any, item: string, type: string) {
  if (event.target.checked) {
    // If checkbox is checked, add the item to respective selectedItems array based on type
    if (type === 'allowed') {
      this.selectedAllowedItems.push(item);
    } else if (type === 'blocked') {
      this.selectedBlockedItems.push(item);
    }
  } else {
    // If checkbox is unchecked, remove the item from respective selectedItems array based on type
    if (type === 'allowed') {
      const index = this.selectedAllowedItems.indexOf(item);
      if (index !== -1) {
        this.selectedAllowedItems.splice(index, 1);
      }
    } else if (type === 'blocked') {
      const index = this.selectedBlockedItems.indexOf(item);
      if (index !== -1) {
        this.selectedBlockedItems.splice(index, 1);
      }
    }
  }
}

// moveToBlocked() {
//   // Move selected items from allowedUrl to blockedUrl
//   for (const selectedItem of this.selectedAllowedItems) {
//     const index = this.allowedUrl.indexOf(selectedItem);
//     if (index !== -1) {
//       this.allowedUrl.splice(index, 1); // Remove from allowedUrl
//       this.blockedUrl.push(selectedItem); // Add to blockedUrl
//       console.log('Allowed URLs:', this.allowedUrl);
//         console.log('Blocked URLs:', this.blockedUrl);
//     }
//   }
//   // Clear selected items array after moving items
//   this.selectedAllowedItems = [];
// }

moveToBlocked() {
  const itemsToRemove: string[] = [];

  for (const selectedItem of this.selectedAllowedItems) {
    const index = this.allowedUrl.indexOf(selectedItem);
    if (index !== -1) {
      this.blockedUrl.push(selectedItem); // Add to blockedUrl
      itemsToRemove.push(selectedItem); // Prepare items to remove from allowedUrl
    }
  }

  // Remove selected items from allowedUrl after the loop finishes
  for (const itemToRemove of itemsToRemove) {
    const indexToRemove = this.allowedUrl.indexOf(itemToRemove);
    if (indexToRemove !== -1) {
      this.allowedUrl.splice(indexToRemove, 1); // Remove from allowedUrl
    }
  }

  // Clear selected items array after moving items
  this.selectedAllowedItems = [];

  // Update filteredAllowedUrl after moving items
  this.applyFilter();
}



moveToAllowed() {
  // Move selected items from blockedUrl to allowedUrl
  for (const selectedItem of this.selectedBlockedItems) {
    const index = this.blockedUrl.indexOf(selectedItem);
    if (index !== -1) {
      this.blockedUrl.splice(index, 1); // Remove from blockedUrl
      this.allowedUrl.push(selectedItem); // Add to allowedUrl
      console.log('Allowed URLs:', this.allowedUrl);
        console.log('Blocked URLs:', this.blockedUrl);
    }
  }
  // Clear selected items array after moving items
  this.selectedBlockedItems = [];

  this.applyBlockedFilter()
}




}
