import { Component } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent {

  policyForm: FormGroup;


  
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
  constructor(public noteService: NoteService,private fb: FormBuilder, private common: CommonServicesService,private spinner: NgxSpinnerService) {
    this.notes = this.noteService.getNotes();

    this.policyForm = this.fb.group({
      username: ['', Validators.required],
      // password: ['', Validators.required],
      // captcha:  ['', Validators.required]
    })

  }

  params: Partial<{ policytype: string | null; policyvalue: string | null; }>;


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

  formNo:any

  AddPolicy(i:any, policy:any,autor:any){
    console.log("Add url clicked",i, policy, autor);
    this.formNo = i
  }

  submitt(){
    console.log("submit called", this.policyForm.value);

    this.params.policytype = this.policyForm.value.username

    console.log( "para is: ", this.params);
    

    console.log();
    this.spinner.show()
        // this.common.addPolicy(this.policyForm.value).subscribe((res: any) => {
    
        //   console.log("in the unit name subscribe");
    
          
        //   if (res.api_status === true) {
        //     this.spinner.hide();
    

    
        //   } else {
    
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
}
