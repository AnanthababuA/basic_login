import { Component } from '@angular/core';
// import { Note } from './note';
// import { NoteService } from './note.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-policy-configuration',
  templateUrl: './policy-configuration.component.html',
  styleUrls: ['./policy-configuration.component.scss']
})


export class PolicyConfigurationComponent {

  
  policySummary: any

  policyForm: FormGroup;
  policyFormURL: FormGroup;


  policyTypes: any = "URL"

  policyValue: any
  userName = this.ts.getUser();

  loaderStatus: string = 'Loading...';

  sidePanelOpened = true;
  // notes = this.noteService.getNotes();
  // selectedNote: Note = Object.create(null);
  active: boolean = false;
  searchText = '';
  clrName = 'warning';
  colors = [
    { colorName: 'primary' },
    { colorName: 'warning' },
    { colorName: 'accent' },
    { colorName: 'error' },
    { colorName: 'success' },
  ];


  // urlForm: FormGroup;
  // addedUrls: string[] = [];

  urlForm: FormGroup;

  // addedUrls: { url: string; id: number }[] = [];

  // nextId: number = 1;

  addedUrls: string[] = [];

  dataSource: MatTableDataSource<string> = new MatTableDataSource();


  addedIPs: string[] = [];
  ipForm: FormGroup;
  ipDataSource: MatTableDataSource<string> = new MatTableDataSource();
  server_policy_version: any
  constructor( private fb: FormBuilder, private common: CommonServicesService, private spinner: NgxSpinnerService, private ts: TokenStorageService) {
    // this.notes = this.noteService.getNotes();

    this.policyForm = this.fb.group({
      policyvalue: ['', Validators.required],
      policytype: [''],
    })

    // this.policyForm = this.fb.group({
    //   policyvalues: this.fb.array([this.createPolicyControl()])
    // });


    this.policyFormURL = this.fb.group({
      policyvalue: ['', Validators.required],
      policytype: [''],
    })

    // this.urlForm = this.fb.group({
    //   url: ['', Validators.required]
    // });

    this.urlForm = this.fb.group({
      // url: ['']
      url: ['', [Validators.pattern(/.*\..*/)]],

    });

    this.ipForm = this.fb.group({
      ip: ['', [Validators.pattern(/^(\d{1,3}\.){3}\d{1,3}$/)]], // Pattern for IPv4 addresses
    });


  }

  // addUrl() {
  //   const urlControl = this.urlForm.get('url');

  //   if (urlControl && urlControl.valid) {
  //     const newUrl = urlControl.value;
  //     this.addedUrls.push(newUrl);
  //     this.urlForm.reset();
  //   }
  // }

  // addUrl() {
  //   const urlControl = this.urlForm.get('url');

  //   if (urlControl && urlControl.valid) {
  //     const newUrl = { url: urlControl.value, id: this.nextId++ };
  //     this.addedUrls.push(newUrl);
  //     this.urlForm.reset();
  //   }
  // }


  // addUrl() {
  //   const urlControl = this.urlForm.get('url');

  //   if (urlControl && urlControl.valid) {
  //     const newUrl = urlControl.value;
  //     this.addedUrls.push(newUrl);
  //     this.dataSource.data = this.addedUrls; // Update dataSource
  //     this.urlForm.reset();
  //   }
  // }

  addUrl() {
    const urlControl = this.urlForm.get('url');

    if (urlControl && urlControl.valid) {
      const newUrl = urlControl.value;

      // Check if the URL already exists in the addedUrls array
      if (!this.addedUrls.includes(newUrl)) {
        this.addedUrls.push(newUrl);
        this.dataSource.data = this.addedUrls; // Update dataSource
      } else {
        // Inform the user that the URL already exists

        Swal.fire({
          icon: 'error',
          title: `URL Already added`,
        })
        console.log('URL already exists.');
        // You might want to show a message to the user indicating the URL already exists
      }

      this.urlForm.reset();
    }
  }





  // deleteUrl(id: number) {
  //   this.addedUrls = this.addedUrls.filter(url => url.id !== id);
  // }

  deleteUrl(url: string) {
    this.addedUrls = this.addedUrls.filter(u => u !== url);

    this.dataSource.data = this.addedUrls; // Update dataSource
  }




  displayedColumns1: string[] = ['serialNumber', 'URL', 'action'];

  submitUrls() {
    // Implement your logic to submit the URLs
    console.log('Submitted URLs:', this.addedUrls);

    this.policyForm.value.policytype = this.policyTypes
    console.log("submit called", this.policyForm.value);


    this.policyValue = this.addedUrls


    console.log();
    this.spinner.show()
    this.common.addPolicy(this.policyValue, this.policyTypes).subscribe((res: any) => {

      console.log("in the unit name subscribe");


      if (res.api_status === true) {
        this.spinner.hide();

        this.addedUrls = [];

        Swal.fire({
          icon: 'success',
          title: `${res.message}`,
        })

      } else {
        this.spinner.hide();


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


  addIP() {
    const ipControl = this.ipForm.get('ip');

    if (ipControl && ipControl.valid) {
      const newIP = ipControl.value;

      if (!this.addedIPs.includes(newIP)) {
        this.addedIPs.push(newIP);
        this.ipDataSource.data = this.addedIPs;
      } else {
        Swal.fire({
          icon: 'error',
          title: `IP Address Already added`,
        });
        console.log('IP Address already exists.');
      }

      this.ipForm.reset();
    }
  }

  deleteIP(ip: string) {
    this.addedIPs = this.addedIPs.filter(existingIP => existingIP !== ip);
    this.ipDataSource.data = this.addedIPs;
  }

  displayedColumns2: string[] = ['serialNumber', 'IP', 'action'];

  submitIPs() {
    console.log('Submitted IPs:', this.addedIPs);


    
    // this.policyForm.value.policytype = this.policyTypes
    console.log("submit called", this.policyForm.value);


    this.policyValue = this.addedIPs


    console.log();
    this.spinner.show()
    this.common.addPolicy(this.policyValue, this.policyTypes).subscribe((res: any) => {

      console.log("in the unit name subscribe");


      if (res.api_status === true) {
        this.spinner.hide();

        this.addedUrls = [];

        Swal.fire({
          icon: 'success',
          title: `${res.message}`,
        })

      } else {
        this.spinner.hide();


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


  // createPolicyControl(): FormGroup {
  //   return this.fb.group({
  //     policyvalue: ['', Validators.required]
  //   });
  // }

  // get policyControls() {
  //   return (this.policyForm.get('policyvalues') as FormArray).controls;
  // }

  // addPolicy() {
  //   const policyArray = this.policyForm.get('policyvalues') as FormArray;
  //   policyArray.push(this.createPolicyControl());
  // }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.notes = this.filter(filterValue);
  }

  // filter(v: string): Note[] {
  //   return this.noteService
  //     .getNotes()
  //     .filter((x) => x.title.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  // }


  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  ngOnInit(): void {
    // this.onLoad();


    this.policySummaryAPI();


  }

  policySummaryAPI(){


    this.spinner.show();

    this.common.policySummary().subscribe((res: any) => {

      this.spinner.hide();

      if (res.api_status === true) {

        this.policySummary = res.data

        // dataSource1 = PRODUCT_DATA;

        console.log("policy summary", this.policySummary);

        console.log("policy summary-ip", this.policySummary.IP);

        console.log("policy summary-ip-total", this.policySummary.IP.total);

        // this.dataSource1 = PRODUCT_DATA;



      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })
  }
  // onLoad(): void {
  //   this.selectedNote = this.notes[0];
  // }
  // onSelect(note: Note): void {
  //   this.selectedNote = note;
  //   this.clrName = this.selectedNote.color;
  // }
  // onSelectColor(colorName: string): void {
  //   this.clrName = colorName;
  //   this.selectedNote.color = this.clrName;
  //   // this.clrName.active = !this.clrName.active;
  //   this.active = !this.active;
  // }

  // removenote(note: Note): void {
  //   const index: number = this.notes.indexOf(note);
  //   if (index !== -1) {
  //     this.notes.splice(index, 1);
  //     this.selectedNote = this.notes[0];
  //   }
  // }
  // addNoteClick(): void {
  //   this.notes.unshift({
  //     color: this.clrName,
  //     title: 'this is New notes',
  //     datef: new Date(),
  //   });
  // }

  formNo: any = 0

  AddPolicy(i: any, policy: any, autor: any) {
    console.log("Add url clicked", i, policy, autor);
    this.formNo = i
    this.policyTypes = policy
    if(i ===0){
      console.log("summary page called");
      this.policySummaryAPI();
    }

    if(i===5){
      this.serverPolicyVersionAPi()
    }

    console.log("fornNo", this.formNo);
    
  }


  serverPolicyVersionAPi(){
    console.log("serverPolicyVersionAPi fun",);

    this.spinner.show()
    this.common.serverPolicyVersion().subscribe((res: any) => {

      // console.log("in the unit name subscribe");


      if (res.api_status === true) {
        this.spinner.hide();
        this.server_policy_version = res.server_policy_version
        console.log("serverPolicyVersionAPi",res);
        
        // Swal.fire({
        //   icon: 'success',
        //   title: `${res.message}`,
        // })

      } else {
        this.spinner.hide();


        // Swal.fire({
        //   icon: 'error',
        //   title: `${res.message}`,
        // })
      }

    }, error => {

      this.spinner.hide();

      // this.es.apiErrorHandler(error);
      console.log("eerror---", error);


    })

  }

  submitt() {
    this.policyForm.value.policytype = this.policyTypes
    console.log("submit called", this.policyForm.value);


    this.policyValue = this.policyForm.value


    console.log();
    this.spinner.show()
    this.common.addPolicy(this.policyValue, this.policyTypes).subscribe((res: any) => {

      console.log("in the unit name subscribe");


      if (res.api_status === true) {
        this.spinner.hide();

        Swal.fire({
          icon: 'success',
          title: `${res.message}`,
        })

      } else {
        this.spinner.hide();


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

  submitt2() {
    this.policyFormURL.value.policytype = this.policyTypes
    console.log("submit called", this.policyForm.value);


    this.policyValue = this.policyFormURL.value.policyvalue

    console.log("--", this.policyForm.value.policyvalue);

    console.log();
    this.spinner.show()
    this.common.addPolicy(this.policyValue, this.policyTypes).subscribe((res: any) => {

      console.log("in the unit name subscribe");


      if (res.api_status === true) {
        this.spinner.hide();

        Swal.fire({
          icon: 'success',
          title: `${res.message}`,
        })

      } else {
        this.spinner.hide();


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

  selectedFileName: any

  onFileSelected(event: any) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;

      if (fileName.toLowerCase().endsWith('.csv')) {
        this.selectedFileName = fileInput.files[0].name;

        const uploadFileNameElement = document.getElementById('uploadFileName');
        if (uploadFileNameElement) {
          uploadFileNameElement.style.color = 'green';
        }

      } else {
        this.selectedFileName = 'select csv file';

        const uploadFileNameElement = document.getElementById('uploadFileName');
        if (uploadFileNameElement) {
          uploadFileNameElement.style.color = 'red';
        }

      }
    } else {
      this.selectedFileName = 'No file selected';
    }
  }

  downloadCSV() {
    const table = document.getElementById('myTable');

    if (table) {
      const rows = table.querySelectorAll('tr');
      const csv = [];

      for (let i = 0; i < rows.length; i++) {
        const row = [];
        const cols = rows[i].querySelectorAll('td, th');

        for (let j = 0; j < cols.length; j++) {
          row.push(cols[j].textContent);
        }

        csv.push(row.join(','));
      }

      const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');

      if ((navigator as any).msSaveBlob) {
        (navigator as any).msSaveBlob(blob, 'sample.csv');
      } else {
        link.href = URL.createObjectURL(blob);
        link.download = 'table.csv';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  // uploadPolicy(i: any){

  //   console.log("upload policy",i);

  // }

  uploadPolicy(event: any) {


    console.log("upload policy", event);

    let file = event.target.files[0]

    event.target.value = '';
    console.log("file", file);

    if (file) {

      Swal.fire({
        title: 'Do you want to Upload question paper file?',
        text: file.name,
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Upload',
        denyButtonText: `Cancel`,
      }).then((result) => {

        if (result.isConfirmed) {

          const formData = new FormData();

          formData.append("archive", file);
          // formData.append("event_id", eventId);
          // formData.append("participant_pk", participant_pk)

          this.spinner.show();

          this.common.policyBulkUpload(formData).subscribe((res) => {

            this.spinner.hide();

            if (res.api_status) {

              Swal.fire('QP uploaded successfully', '', 'success').then((result) => {

                // this.loadEvents()

              });

            } else {
              Swal.fire({
                title: 'Error',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }

          }, (error) => {

            this.spinner.hide();

            // this.es.apiErrorHandler(error);
          })

        } else if (result.isDenied) {

          Swal.fire('Upload file cancelled', '', 'info')

        }
      })


    }

  }
  
}
