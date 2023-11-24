import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policy-update',
  templateUrl: './policy-update.component.html',
  styleUrls: ['./policy-update.component.scss'],
})
export class PolicyUpdateComponent {
  loaderStatus: string = 'Loading...';

  // for tab 1
  allowedUrl: string[] = [];
  blockedUrl: string[] = [];

  selectedAllowedItems: string[] = []; // Initialize an array to hold selected allowed items
  selectedBlockedItems: string[] = []; // Initialize an array to hold selected blocked items

  // search
  filteredAllowedUrl: string[] = []; // Initialize filtered allowed URLs as an empty array
  searchText: string = '';

  blockedSearchText: string = ''; // Holds the search text entered by the user for blocked URLs
  filteredBlockedUrl: string[] = [];

  submitchanges: { value: string; status: number }[] = [];

  // for tab 2

  // For handling IP addresses
  ipAllowed: string[] = [];
  ipBlocked: string[] = [];

  selectedAllowedIPs: string[] = [];
  selectedBlockedIPs: string[] = [];

  filteredAllowedIPs: string[] = [];
  searchTextForAllowedIPs: string = '';

  searchTextForBlockedIPs: string = '';
  filteredBlockedIPs: string[] = [];

  constructor(
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log('in ng init');

    this.urlAddtionApi();
    this.urlDeletionApi();

    this.filteredAllowedUrl = this.allowedUrl; // Initially set filteredAllowedUrl to allowedUrl
    this.filteredBlockedUrl = this.blockedUrl; // Initially set filteredBlockedUrl to blockedUrl
  }

  applyFilter() {
    this.filteredAllowedUrl = this.allowedUrl.filter((item: string) => {
      return item.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  searchAllowedUrl() {
    console.log('serach called', this.searchText);

    const search_term = { search_term: this.searchText };

    this.spinner.show();
    this.common.urlAddition(search_term).subscribe(
      (res: any) => {
        console.log('addion subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('additon res is  ', res.policy_data);

          this.allowedUrl = res.policy_data;

          this.filteredAllowedUrl = this.allowedUrl;
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

  searchBlockedUrl() {
    console.log('serach called', this.blockedSearchText);

    const search_term = { search_term: this.blockedSearchText };

    this.spinner.show();
    this.common.urlDeletion(search_term).subscribe(
      (res: any) => {
        console.log('addion subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('additon res is  ', res.policy_data);

          this.blockedUrl = res.policy_data;

          this.filteredBlockedUrl = this.blockedUrl;
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }


  applyBlockedFilter() {
    console.log('blocked url', this.blockedSearchText);

    // const search_term = { search_term: this.blockedSearchText };

    this.filteredBlockedUrl = this.blockedUrl.filter((item: string) => {
      return item.toLowerCase().includes(this.blockedSearchText.toLowerCase());
    });


    // this.spinner.show()
    // this.common.urlDeletion(search_term).subscribe((res: any) => {

    //   console.log("addion subscribe");

    //   if (res.api_status === true) {
    //     this.spinner.hide();

    //     console.log("additon res is  ", res.policy_data);

    //     this.blockedUrl = res.policy_data
    //     this.filteredBlockedUrl = this.blockedUrl; // Initially set filteredBlockedUrl to blockedUrl

    //   } else {
    //     this.spinner.hide();

    //     Swal.fire({
    //       icon: 'error',
    //       title: `${res.message}`,
    //     })
    //   }

    // }, error => {

    //   this.spinner.hide();

    //   // this.es.apiErrorHandler(error);
    //   console.log("eerror---", error);

    // })
  }

  // Add this method in your TypeScript component
  deleteItem(itemToDelete: any) {
    // Assuming 'any' type here; you may replace it with the correct type of your item
    const index = this.submitchanges.indexOf(itemToDelete);
    if (index > -1) {
      this.submitchanges.splice(index, 1);
    }
  }

  tabChanged(event: any) {
    console.log('tab changed', event);
    if (event === 0) {
      console.log('Url clikced');
      this.submitchanges = [];
    } else if (event === 1) {
      console.log('ip clicked');
      this.submitchanges = [];

      this.ipAddtionApi();
      this.ipDeletionApi();
    }
  }

  urlAddtionApi() {
    this.spinner.show();
    this.common.urlAddition(this.searchText).subscribe(
      (res: any) => {
        console.log('addion subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('additon res is  ', res.policy_data);

          this.allowedUrl = res.policy_data;
          this.filteredAllowedUrl = this.allowedUrl;
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

  urlDeletionApi() {
    this.spinner.show();
    this.common.urlDeletion(this.blockedSearchText).subscribe(
      (res: any) => {
        console.log('addion subscribe');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('additon res is  ', res.policy_data);

          this.blockedUrl = res.policy_data;
          this.filteredBlockedUrl = this.blockedUrl; // Initially set filteredBlockedUrl to blockedUrl
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

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

  moveToBlocked() {
    const itemsToRemove: string[] = [];

    for (const selectedItem of this.selectedAllowedItems) {
      const index = this.allowedUrl.indexOf(selectedItem);
      if (index !== -1) {
        this.blockedUrl.push(selectedItem); // Add to blockedUrl
        itemsToRemove.push(selectedItem); // Prepare items to remove from allowedUrl

        // Update submitchanges array with URL and status 1 for blocked
        // this.submitchanges.push({ value: selectedItem, status: 1 });

        // Check if the item already exists in submitchanges
        let itemFound = false;
        for (const submission of this.submitchanges) {
          if (submission.value === selectedItem) {
            submission.status = 1; // Update the status if the value exists
            itemFound = true;
            break;
          }
        }

        // If the item is not found in submitchanges, add it with status 1
        if (!itemFound) {
          this.submitchanges.push({ value: selectedItem, status: 1 });
        }
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
        // this.submitchanges.push({ value: selectedItem, status: 0 });

        // Check if the item already exists in submitchanges
        let itemFound = false;
        for (const submission of this.submitchanges) {
          if (submission.value === selectedItem) {
            submission.status = 0; // Update the status if the value exists
            itemFound = true;
            break;
          }
        }

        // If the item is not found in submitchanges, add it with status 0
        if (!itemFound) {
          this.submitchanges.push({ value: selectedItem, status: 0 });
        }

        console.log('Allowed URLs:', this.allowedUrl);
        console.log('Blocked URLs:', this.blockedUrl);
      }
    }
    // Clear selected items array after moving items
    this.selectedBlockedItems = [];

    this.applyBlockedFilter();
  }

  urlUpdate() {
    //   console.log("selectedBlockedItems...", this.submitchanges);
    const policyType = 'URL'; // Set the policy type
    const formattedData = { policy_type: policyType, data: this.submitchanges };
    console.log('URL request parameter...', formattedData);

    Swal.fire({
      title: 'Do you want to do the changes',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Update',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('log updated in the db');

        this.spinner.show();
        this.common.policyStatusChange(formattedData).subscribe(
          (res: any) => {
            console.log('addion subscribe');

            if (res.api_status === true) {
              this.spinner.hide();
              Swal.fire({
                icon: 'success',
                title: `${res.data}`,
              });

              this.urlAddtionApi();
              this.urlDeletionApi();
              this.submitchanges = []
            } else {
              this.spinner.hide();

              Swal.fire({
                icon: 'error',
                title: `${res.message}`,
              });
            }
          },
          (error) => {
            this.spinner.hide();

            // this.es.apiErrorHandler(error);
            console.log('eerror---', error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Updating URL cancelled', '', 'info');
      }
    });
  }

  ipAddtionApi() {
    this.spinner.show();
    this.common.ipAddition(this.searchText).subscribe(
      (res: any) => {
        console.log('ip additon');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('additon res is  ', res.policy_data);

          this.ipAllowed = res.policy_data;
          this.filteredAllowedIPs = this.ipAllowed;
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

  ipDeletionApi() {
    this.spinner.show();
    this.common.ipDeletion(this.blockedSearchText).subscribe(
      (res: any) => {
        console.log('ip Deletion');

        if (res.api_status === true) {
          this.spinner.hide();

          console.log('additon res is  ', res.policy_data);

          this.ipBlocked = res.policy_data;
          this.filteredBlockedIPs = this.ipBlocked; // Initially set filteredBlockedUrl to blockedUrl
        } else {
          this.spinner.hide();

          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();

        // this.es.apiErrorHandler(error);
        console.log('eerror---', error);
      }
    );
  }

  onCheckboxChangeIp(event: any, item: string, type: string) {
    if (event.target.checked) {
      // If checkbox is checked, add the item to respective selectedItems array based on type
      if (type === 'allowed') {
        this.selectedAllowedIPs.push(item);
      } else if (type === 'blocked') {
        this.selectedBlockedIPs.push(item);
      }
    } else {
      // If checkbox is unchecked, remove the item from respective selectedItems array based on type
      if (type === 'allowed') {
        const index = this.selectedAllowedIPs.indexOf(item);
        if (index !== -1) {
          this.selectedAllowedIPs.splice(index, 1);
        }
      } else if (type === 'blocked') {
        const index = this.selectedBlockedIPs.indexOf(item);
        if (index !== -1) {
          this.selectedBlockedIPs.splice(index, 1);
        }
      }
    }
  }

  moveToBlockedIp() {
    const itemsToRemove: string[] = [];

    for (const selectedItem of this.selectedAllowedIPs) {
      const index = this.ipAllowed.indexOf(selectedItem);
      if (index !== -1) {
        this.ipBlocked.push(selectedItem); // Add to ipBlocked
        itemsToRemove.push(selectedItem); // Prepare items to remove from ipAllowed

        let itemFound = false;
        for (const submission of this.submitchanges) {
          if (submission.value === selectedItem) {
            submission.status = 1; // Update the status if the value exists
            itemFound = true;
            break;
          }
        }

        if (!itemFound) {
          this.submitchanges.push({ value: selectedItem, status: 1 });
        }
      }
    }

    for (const itemToRemove of itemsToRemove) {
      const indexToRemove = this.ipAllowed.indexOf(itemToRemove);
      if (indexToRemove !== -1) {
        this.ipAllowed.splice(indexToRemove, 1); // Remove from ipAllowed
      }
    }

    this.selectedAllowedIPs = [];
    // Update filteredAllowedIPs after moving items
    this.applyIPFilter();
  }

  moveToAllowedIp() {
    for (const selectedItem of this.selectedBlockedIPs) {
      const index = this.ipBlocked.indexOf(selectedItem);
      if (index !== -1) {
        this.ipBlocked.splice(index, 1); // Remove from ipBlocked
        this.ipAllowed.push(selectedItem); // Add to ipAllowed

        let itemFound = false;
        for (const submission of this.submitchanges) {
          if (submission.value === selectedItem) {
            submission.status = 0; // Update the status if the value exists
            itemFound = true;
            break;
          }
        }

        if (!itemFound) {
          this.submitchanges.push({ value: selectedItem, status: 0 });
        }

        console.log('Allowed IPs:', this.ipAllowed);
        console.log('Blocked IPs:', this.ipBlocked);
      }
    }

    this.selectedBlockedIPs = [];
    // this.applyBlockedIPFilter();
  }

  applyIPFilter() {
    this.filteredAllowedIPs = this.ipAllowed.filter((item: string) => {
      return item
        .toLowerCase()
        .includes(this.searchTextForAllowedIPs.toLowerCase());
    });
  }

  applyBlockedIPFilter() {
    console.log('blocked IP', this.searchTextForBlockedIPs);

    const search_term = { search_term: this.searchTextForBlockedIPs };

    this.spinner.show();
    // Assuming you have a similar method to retrieve IP data based on search term
    this.common.ipDeletion(search_term).subscribe(
      (res: any) => {
        console.log('addition subscribe');

        if (res.api_status === true) {
          this.spinner.hide();
          console.log('addition res is ', res.policy_data);

          // Assuming res.policy_data contains IP data retrieved from the API
          this.ipBlocked = res.policy_data;
          this.filteredBlockedIPs = this.ipBlocked; // Initially set filteredBlockedIPs to ipBlocked
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();
        console.log('error---', error);
        // Handle error cases as per your application's requirements
      }
    );
  }

  deleteIPItem(itemToDelete: any) {
    // Replace 'any' with the correct type of your IP item if known
    const index = this.submitchanges.findIndex(
      (item: any) => item.value === itemToDelete
    );
    if (index > -1) {
      this.submitchanges.splice(index, 1);
    }
  }

  ipUpdate() {
    const policyType = 'IP'; // Set the policy type for IP addresses
    const formattedData = { policy_type: policyType, data: this.submitchanges };
    console.log('IP request parameter...', formattedData);

    Swal.fire({
      title: 'Do you want to update the changes?',
      showDenyButton: true,
      confirmButtonText: 'Update',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the action to update IP-related changes in the database
        console.log('Updating changes for IP in the database...');

        this.spinner.show();
        this.common.policyStatusChange(formattedData).subscribe(
          (res: any) => {
            console.log('addion subscribe');

            if (res.api_status === true) {
              this.spinner.hide();
             
              Swal.fire({
                icon: 'success',
                title: `${res.data}`,
              });
              this.ipAddtionApi();
              this.ipDeletionApi();
              this.submitchanges = []
            } else {
              this.spinner.hide();

              Swal.fire({
                icon: 'error',
                title: `${res.message}`,
              });
            }
          },
          (error) => {
            this.spinner.hide();

            // this.es.apiErrorHandler(error);
            console.log('eerror---', error);
          }
        );

      } else if (result.isDenied) {
        Swal.fire('IP update cancelled', '', 'info');
      }
    });
  }

  searchAllowedIP() {
    console.log('search called for IP', this.searchTextForAllowedIPs);

    const search_term = { search_term: this.searchTextForAllowedIPs };

    this.spinner.show();
    // Assuming you have a similar method to retrieve IP data based on search term
    this.common.ipAddition(search_term).subscribe(
      (res: any) => {
        console.log('addition subscribe for IP');

        if (res.api_status === true) {
          this.spinner.hide();
          console.log('addition res for IP is ', res.policy_data);

          // Assuming res.policy_data contains IP data retrieved from the API
          this.ipAllowed = res.policy_data;
          this.filteredAllowedIPs = this.ipAllowed; // Initially set filteredAllowedIPs to ipAllowed
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
        }
      },
      (error) => {
        this.spinner.hide();
        console.log('error---', error);
        // Handle errors as needed
      }
    );
  }
}
