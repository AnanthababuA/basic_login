import { Component } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent {

  
  policyForm: FormGroup;
  policyFormURL: FormGroup;


policyTypes: any = "URL"

policyValue:any
userName = this.ts.getUser();

  sidePanelOpened = true;
  notes = this.noteService.getNotes();
  selectedNote: Note = Object.create(null);
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
  constructor(public noteService: NoteService,private fb: FormBuilder, private common: CommonServicesService,private spinner: NgxSpinnerService, private ts: TokenStorageService) {
    this.notes = this.noteService.getNotes();

    this.policyForm = this.fb.group({
      policyvalue: ['', Validators.required],
      policytype: [''],
    })

    this.policyFormURL = this.fb.group({
      policyvalue: ['', Validators.required],
      policytype: [''],
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.notes = this.filter(filterValue);
  }

  filter(v: string): Note[] {
    return this.noteService
      .getNotes()
      .filter((x) => x.title.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }


  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  ngOnInit(): void {
    this.onLoad();
  }
  onLoad(): void {
    this.selectedNote = this.notes[0];
  }
  onSelect(note: Note): void {
    this.selectedNote = note;
    this.clrName = this.selectedNote.color;
  }
  onSelectColor(colorName: string): void {
    this.clrName = colorName;
    this.selectedNote.color = this.clrName;
    // this.clrName.active = !this.clrName.active;
    this.active = !this.active;
  }

  removenote(note: Note): void {
    const index: number = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
      this.selectedNote = this.notes[0];
    }
  }
  addNoteClick(): void {
    this.notes.unshift({
      color: this.clrName,
      title: 'this is New notes',
      datef: new Date(),
    });
  }

  formNo:any = 1

  AddPolicy(i:any, policy:any,autor:any){
    console.log("Add url clicked",i, policy, autor);
    this.formNo = i
    this.policyTypes = policy
  }

  submitt(){
    this.policyForm.value.policytype = this.policyTypes
    console.log("submit called", this.policyForm.value.policyvalue);

  
this.policyValue = this.policyForm.value.policyvalue
    

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
    
            Swal.fire({
              icon: 'error',
              title: `${res.message}`,
            })
          }
    
        }, error => {
    
          this.spinner.hide();
    
          this.common.apiErrorHandler(error);
          console.log("eerror---", error);
    
    
        })

    
  }

  submitt2(){
    this.policyFormURL.value.policytype = this.policyTypes
    console.log("submit called", this.policyForm.value);


this.policyValue = this.policyFormURL.value.policyvalue
    
console.log("--",this.policyForm.value.policyvalue);

    console.log();
    this.spinner.show()
        this.common.addPolicy(this.policyValue,  this.policyTypes).subscribe((res: any) => {
    
          console.log("in the unit name subscribe");
    
          
          if (res.api_status === true) {
            this.spinner.hide();
    
            Swal.fire({
              icon: 'success',
              title: `${res.message}`,
            })
    
          } else {
    
            Swal.fire({
              icon: 'error',
              title: `${res.message}`,
            })
          }
    
        }, error => {
    
          this.spinner.hide();
    
          this.common.apiErrorHandler(error);
          console.log("eerror---", error);
    
    
        })

    
  }

  selectedFileName:any

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

  downloadCSV(){
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
}
