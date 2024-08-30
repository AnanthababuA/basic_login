import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-schedulerform',
  templateUrl: './schedulerform.component.html',
  styleUrls: ['./schedulerform.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ],
})
export class SchedulerformComponent {
    @ViewChild('resetButton') resetButton: ElementRef;
    stream_id: any;
    neet2jee: string = '';
    neeet2jee: string = '';
    neetjeeArray: { id: string; value: unknown; }[];

    No = 'No';
    Yes = 'Yes';  
  
  setAll(checkall: boolean) {
    if (checkall == true){
      this.selectedItems = [];
      this.participantsListSearch = this.participantsListSearch.map((i: any) => ({...i, selected: true}))
       this.participantsListSearch.forEach((val: any) =>{
        val['participant_category'] = this.eventDet.pCategory;
        val['name'] = val['value'];
        val['invited'] = true;
        val['participated'] = false;
        console.log(val)
        this.selectedItems.push(val);
       })
    }
    else{
      this.participantsListSearch = this.participantsListSearch.map((i: any) => ({...i, selected: false}))
  
      this.participantsListSearch.forEach((val: any) =>{
        this.selectedItems.splice(val);
       })
    }
  }
  deletedselectede(){
    this.participantsListSearch = this.participantsListSearch.map((i: any) => ({...i, selected: true}))
       this.participantsListSearch.forEach((val: any) =>{
        val['participant_category'] = this.eventDet.pCategory;
        val['name'] = val['value'];
        val['invited'] = true;
        val['participated'] = false;
        console.log(val)
        this.selectedItems.push(val);
       });
  
      this.participantsListSearch = this.participantsListSearch.map((i: any) => ({...i, selected: false}))
  
      this.participantsListSearch.forEach((val: any) =>{
        this.selectedItems.splice(val);
       });
      }
  
    selectAllstreamChecked: boolean = true;
  
    // color: ThemePalette = 'accent';
    checked = false;
    disabled = false;
    displayText: string = 'No';
  
    choiceList: any = [];
  
    neetjee: any;

    stadvalue: any;
    strevalue: any;

  
    subjectChoices = [];
  
    streamChoices = [];
  
    eventDet: any = {
      title: '',
      type: '',
      schtype: '',
      location: '',
      color: '#000000',
      is_1_n: 0,
      allowed_allocation_id: 3,
      classStd: '',
      section: '',
      stream: '',
      subject: '',
      medium: '',
      isAllDay: false,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      repeat: 1,
      batchs: 1,
      pCategory: '',
      group: '',
      competitive_exam: ''
    }
  
    selectedStreamName: string = '';
  
    schoolType: any = [];
  
    schoolTypeid: any = [];
  
    scheduleForm!: FormGroup;
  
    participantsList:any = [];
  
    participantsListSearch:any = [];
  
    districtList:any = [];
  
    zoneList:any = [];
  
    schoolList:any = [];
  
    dfilter: any = '';
  
    zfilter: any = '';
  
    sfilter: any = '';
  
    selectedItems: any = [];
  
    btnType: boolean  = false;
  
    StartMinDate: any = moment().format('YYYY-MM-DD');
  
    EndMinDate: any = moment().format('YYYY-MM-DD');
  
    minDate: any;
  
    minDateStart: any;
  
    maxDate: any;
  
    startMaxDate: any;
  
    userDetails: any;
  
    is1Nallocation: any;
  
    constructor(private spinner: NgxSpinnerService, private ss: SchedulerService, private fb: FormBuilder, private ts: TokenStorageService) {
    
    }
  
    ngOnInit(): void {
  
      this.selectAllstreamChecked = false;
  
      this.userDetails = this.ts.getUser();
  
      if(this.userDetails?.usertype == 'teacher' || this.userDetails?.usertype == 'hm' || this.userDetails?.usertype == 'school') {
        
        let eDay = moment().add(30, 'days').format('YYYY-MM-DD');
  
        this.startMaxDate = {
          year: parseInt(eDay.split('-')[0]),
          month: parseInt(eDay.split('-')[1]),
          day: parseInt(eDay.split('-')[2]),
        };
        this.Getstd();
        this.ss.restrictDays = 3;
      }
      else
      {
        this.ss.restrictDays = 365;
        if(this.eventDet.is_1_n == 0)
        {
          this.eventDet.allowed_allocation_id = '0';
        }
        else
        {
          this.eventDet.allowed_allocation_id = '3';
        }
        
      }
  
      this.setMinDateForPicker();
  
      this.spinner.show();
  
      /* The above code is subscribing to the getOptionsData() method of the service. */
      this.ss.getOptionsData().subscribe((res) => {
  
        this.spinner.hide();
  
        if (res.api_status === true) {
  
          this.choiceList = res;
  
          this.choiceList.std_choices = [];
  
          // res.school_type_choices.forEach((s: any) => { this.schoolType.push(s.value) });        
  
        } else {
  
          Swal.fire({
            title: 'Unable to load choice list',
            text: '',
            icon: 'info'
          })
  
        }
  
      });
  
      /* Creating a form group with the name scheduleForm. */
      this.scheduleForm = this.fb.group({
        title: new FormControl('', [Validators.required]),
        type: new FormControl('', []),
        schooltypeid: new FormControl('', []),
        location: new FormControl('', [Validators.required]),
        is_1_n: new FormControl('', []),
        allowed_allocation_id: new FormControl('', []),
        competitive_exam: new FormControl('',[]),
        color: new FormControl('', []),
        classStd: new FormControl('', [Validators.required]),
        section: new FormControl('', []),
        stream: new FormControl('', []),
        subject: new FormControl('', [Validators.required]),
        medium: new FormControl('', [Validators.required]),
        isAllDay: new FormControl('no', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
        pCategory: new FormControl('', []),
        dfilter: new FormControl('', []),
        zfilter: new FormControl('', []),
        sfilter: new FormControl('', []),
      });
  
      /* The above code is listening to the value changes of the pCategory field. */
      this.scheduleForm.get('pCategory')?.valueChanges.subscribe((res) => {
        // // console.log(res);
        this.deletedselectede();
        this.clearParticipants();
        if (res === 'BLOCK') {
  
          this.scheduleForm.get('dfilter')?.setValidators([Validators.required]);
  
          this.scheduleForm.get('zfilter')?.clearValidators();
          this.scheduleForm.get('sfilter')?.clearValidators();
  
        }
        else if (res === 'SCHOOL') {
  
          this.scheduleForm.get('dfilter');
          this.scheduleForm.get('zfilter');
  
          this.scheduleForm.get('sfilter');
  
        }
        else if (res === 'STUDENT') {
  
          this.scheduleForm.get('dfilter')?.setValidators([Validators.required]);
          this.scheduleForm.get('zfilter')?.setValidators([Validators.required]);
          this.scheduleForm.get('sfilter')?.setValidators([Validators.required]);
  
        }
        else if (res === 'DISTRICT') {
  
          this.scheduleForm.get('dfilter')?.clearValidators();
          this.scheduleForm.get('zfilter')?.clearValidators();
          this.scheduleForm.get('sfilter')?.clearValidators();
  
        }
  
        this.scheduleForm.get('dfilter')?.updateValueAndValidity();
        this.scheduleForm.get('zfilter')?.updateValueAndValidity();
        this.scheduleForm.get('sfilter')?.updateValueAndValidity();
  
      })
  
      // this.scheduleForm.valueChanges.subscribe(()=>{
      //   this.findInvalidControls()
      // })
    }
  
    findInvalidControls() {
          const invalid = [];
          const controls = this.scheduleForm.controls;
          for (const name in controls) {
              if (controls[name].invalid) {
                  invalid.push(name);
              }
          }
          console.log(invalid);
    }

    stdvalue(element: any){
      console.log("element", element);

      this.stadvalue = element.value;

      this.loadStreamSubjects();
    }

    streamvalue(element: any){
      this.strevalue = element.value;
        }
  
  
    /**
     * It loads the subjects and streams based on the class and stream selected
     */
    loadStreamSubjects() {
      let standard = this.stadvalue;
      let stream = this.strevalue;
  
      // let standard = parseInt(this.scheduleForm.controls['classStd'].value);
      // let stream = this.scheduleForm.controls['stream'].value;

      console.log("load stream subjcet", standard)
  
      let params: any = { class: '', stream: ''}
  
      this.spinner.show();
  
      if(standard < 10) {
  
        this.subjectChoices = [];
        this.streamChoices = [];
  
        this.eventDet.subject = '';
        this.eventDet.stream = '';
  
        params = { class: standard, stream: null}
  
        this.ss.getStreamSubject(params).subscribe((res) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.subjectChoices = res.data
  
          }
        })
  
      } else if (standard > 10 && stream === '') {
  
        this.subjectChoices = [];
        this.eventDet.subject = '';
  
        params = { class: standard, stream: null}
  
        this.ss.getStreamSubject(params).subscribe((res) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.streamChoices = res.data
  
          }
        })
  
      } else {
  
        params = { class: standard, stream: stream}
  
        this.ss.getStreamSubject(params).subscribe((res) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.subjectChoices = res.data
  
          }
        })
      }
  
    }
  
    subject_load()
    {
  
      let standard = parseInt(this.scheduleForm.controls['classStd'].value);
      // let stream = this.scheduleForm.controls['stream'].value;
      let stream = this.stream_id;
  
      let params: any = { class: '', stream: ''}
  
      this.spinner.show();
  
      if(standard < 10) {
  
        this.subjectChoices = [];
        this.streamChoices = [];
  
        this.eventDet.subject = '';
        this.eventDet.stream = '';
  
        params = { class: standard, stream: null}
  
        this.ss.getStreamSubject(params).subscribe((res) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.subjectChoices = res.data
  
          }
        })
  
      } else if (standard > 10 && stream === '') {
  
        this.subjectChoices = [];
        this.eventDet.subject = '';
  
        params = { class: standard, stream: null}
  
        this.ss.getStreamSubject(params).subscribe((res) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.streamChoices = res.data
  
          }
        })
  
      } else {
  
        params = { class: standard, stream: stream}
  
        this.ss.getStreamSubject(params).subscribe((res) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.subjectChoices = res.data
  
          }
        })
      }
  
      this.updateSelectedStreamName();
  
    }
  
    stream_select(stream_id: MatSelectChange)
    {
  
      this.stream_id = stream_id.value;   
  
      const allstmchcked = this.stream_id.length === this.streamChoices.length;
  
      this.selectAllstreamChecked = allstmchcked;
  
      this.subject_load();
          
    }
  
    getSelectedstreamText(){
  
      if(this.stream_id && this.stream_id.length > 0)
      {
        return `${this.stream_id.length} streams selected`;
      }
      return ''
    }
  
    updateSelectedStreamName() {
      let selectedValues: any;
  
      if (this.scheduleForm.controls['stream'].value !== null && this.scheduleForm.controls['stream'].value !== undefined && this.scheduleForm.controls['stream'].value.length === this.stream_id.length) {
        selectedValues = this.scheduleForm.controls['stream'].value; // Assign the value if it's not empty
      }
      else
      {
        selectedValues = this.stream_id;
      }
  
      console.log('selected Values', selectedValues);
  
  
      // Map selected values to stream names
      const selectedStreamNames = selectedValues.map((value: any) => {
        const streamChoice = this.streamChoices.find(choice => choice[0] === value);
        return streamChoice ? streamChoice[1] : ''; // Get the stream name or an empty string if not found
      });
  
      this.selectedStreamName = selectedStreamNames;
    }
    
  
    streamSelectAll(checked: boolean)
    {
      console.log('checked',checked)
      this.selectAllstreamChecked = checked;
      if(checked)
      {
        console.log('stream choice value',this.streamChoices)
        this.stream_id = this.streamChoices.map(choice => choice[0])
        this.eventDet.group = this.stream_id;
        console.log('the stream id', this.stream_id )
        console.log('the stream id', this.eventDet.group )
        this.subject_load();
      }
      else
      {
        this.eventDet.group = [];
        this.selectedStreamName = '';
      }
  
    }
  
    /**
     * It fetches the list of classes based on the school type selected by the user
     * @param {any} element - any - The element that was clicked
     * @param {string} sType - string - The school type selected by the user.
     */
    selectedSchoolType(element: any) {

      console.log("sch type id", element.value)
  
      this.spinner.show();
  
      // if (element.target.checked == false) {
      //   this.schoolType = this.schoolType.filter((e: any) => { return e !== sType });
      // } else {
      //   this.schoolType.push(sType);
      //   this.schoolTypeid.push(sid);
      //   // console.log(this.schoolTypeid)
      // }
  
      // this.schoolType = [...new Set(this.schoolType)];
      this.schoolType = element.value;
  
      if (this.schoolType.length) {
  
        this.ss.getClass({schooltype: this.schoolType}).subscribe((res: any) => {
    
          this.spinner.hide();
    
          if(res.api_status === true) {
    
            this.choiceList.std_choices = res.std_list
            
          }
        })
      } else {
  
        this.spinner.hide();
  
        this.choiceList.std_choices = [];
        this.streamChoices = [];
        this.subjectChoices = [];
  
        this.scheduleForm.patchValue({'classStd': '', 'subject': '', 'stream': ''});
  
      }
  
    }
  
    /**
     * If the user selects "Yes" for "All Day Event", then the form control for "Start Time" and "End
     * Time" are cleared and the validators for those controls are removed
     * @param {any} val - any - The value of the selected option.
     */
    onAllDayChange(val: any) {
  
      this.eventDet.isAllDay = val.value == 'yes' ? true : false;
  
      this.scheduleForm.get('isAllDay')?.setValue(this.eventDet.isAllDay);
  
      
      this.scheduleForm.patchValue({ startTime: '' });
      this.scheduleForm.patchValue({ endTime: '' });
  
      if (this.eventDet.isAllDay) {
  
        this.scheduleForm.get('startTime')?.clearValidators(); 
        this.scheduleForm.get('endTime')?.clearValidators(); 
  
      } else {
  
        this.scheduleForm.get('startTime')?.addValidators(Validators.required)
        this.scheduleForm.get('endTime')?.addValidators(Validators.required)
  
      }
  
      this.scheduleForm.get('startTime')?.updateValueAndValidity();
      this.scheduleForm.get('endTime')?.updateValueAndValidity();
  
    }
  
    /**
     * It clears the participants list and then fetches the districts list from the server
     * @param {any} cat - any - This is the category that is selected from the dropdown.
     */
    // changeCategory(cat: any) {
    
    //   let category = cat.value;
  
    //   this.clearParticipants();
    //   this.selectedItems = [];
  
    //   this.spinner.show();
  
    //   this.ss.getDistricts({}).subscribe(res => {
  
    //     this.spinner.hide();
  
    //     if(res.api_status === true) {
  
    //       if(category === 'DISTRICT') {
  
    //         // res.data.unshift({id: 'ALL_DISTRICT', value: 'ALL DISTRICT'});
  
    //         this.participantsList = res.data;
    //         this.participantsListSearch = res.data;
          
    //       } else {
  
    //         this.districtList = res.data;
  
    //       }
    //     }
  
    //   })
  
    // }
    changeCategory(cat: any) {
    
      let category = cat.value;
  
  
      if(this.userDetails.usertype=='school'  || this.userDetails.usertype=='teacher'  || this.userDetails.usertype=='hm'  ){
        this.schoolList = [];
  
        var schtypeid = this.schoolTypeid
            console.log(schtypeid);
      
  
        
          
          this.clearParticipants();
          this.deletedselectede();
  
            this.spinner.show();
  
            
            this.ss.getSchl({ school_type: schtypeid }).subscribe((res: { api_status: boolean; data: any; }) => {
      
              this.spinner.hide();
      
              if(res.api_status === true) {
      
                if(this.eventDet.pCategory === 'SCHOOL') {
      
                  this.participantsList = res.data;
                  this.participantsListSearch = res.data;
      
                  this.updateCheckboxes();
      
                } else {
      
                  this.schoolList = res.data;
      
                }
  
                
              }
      
      
            });
          
      }
  
  
      this.clearParticipants();
      this.deletedselectede();
  
      this.spinner.show(); 
      if(this.userDetails.usertype!='school'  && this.userDetails.usertype!='teacher' && this.userDetails.usertype!='hm' ){
  
        this.ss.getDistricts({}).subscribe(res => {
    
          this.spinner.hide();
    
          if(res.api_status === true) {
                      
            if(category === 'DISTRICT') {
    
              // res.data.unshift({id: 'ALL_DISTRICT', value: 'ALL DISTRICT'});
              // this.ss.getDist({}).subscribe(res => {
                this.participantsList = res.data.slice(1);
                this.participantsListSearch = res.data.slice(1);
              // });
              
            
            }
            else {
              this.districtList = res.data;        
             }         
            
          }
        
        })
      }  
       
    }
  
    /**
     * It clears the participants list and the participants list search
     */
    clearParticipants() {
  
      this.participantsList = [];
  
      this.participantsListSearch = [];
  
    }
  
    /**
     * It gets the list of districts from the server and stores it in the districtList variable
     */
    getDistricts() {
  
      this.spinner.show();
  
      this.ss.getDistricts({}).subscribe((res: { api_status: boolean; data: any; }) => {
  
        this.spinner.hide();
  
        if(res.api_status === true) {
  
          this.districtList = res.data;
  
        }
  
  
      })
    }
  
    /**
     * It gets the list of blocks from the server and stores it in the zoneList variable
     */
    getBlocks() {
  
      this.spinner.show();
  
      this.ss.getBlocks({}).subscribe((res: { api_status: boolean; data: any; }) => {
  
        this.spinner.hide();
  
        if(res.api_status === true) {
  
          this.zoneList = res.data;
          
        }
  
  
      })
    }
  
    /**
     * It gets the list of schools from the server and stores it in the participantsList variable
     */
    getSchools() {
  
      this.spinner.show();
  
      this.ss.getSchools({}).subscribe((res: { api_status: boolean; data: any; }) => {
  
        this.spinner.hide();
  
        if(res.api_status === true) {
  
          this.participantsList = res.data;
          this.participantsListSearch = res.data;
          
        }
  
  
      })
    }
  
    /**
     * It fetches the list of blocks based on the selected district
     */
    selectedDistrictFilter(event:any) {
      // let id = id.id;
      const id=event.target.value;
  console.log("ji",id);
      this.zoneList = [];
      this.schoolList = [];
      
      this.clearParticipants();
  
      if (this.dfilter != '') {
  
        this.spinner.show();
  
  if(id=='ALL_DISTRICT'){
  
    this.ss.getBlocks({dropdownfilter: this.dfilter, wildcard: ''}).subscribe((res: { api_status: boolean; data: any; }) => {
  
      this.spinner.hide();
      if(res.api_status === true) {
        if(this.eventDet.pCategory === 'BLOCK') {
            this.participantsList = res.data.slice(1);
            this.participantsListSearch = res.data.slice(1);
            this.updateCheckboxes();      
  
        } else {
  
          this.zoneList = res.data;
  
        }
      }
    });
  }
  
  else{
    this.ss.getBlk({dropdownfilter: this.dfilter, wildcard: '',id}).subscribe((res: { api_status: boolean; data: any; }) => {
  
      this.spinner.hide();
  
      if(res.api_status === true) {
        if(this.eventDet.pCategory === 'BLOCK') {
          // this.ss.getBlk({dropdownfilter: this.dfilter, wildcard: ''}).subscribe((res) => {
            this.participantsList = res.data.slice(1);
            this.participantsListSearch = res.data.slice(1);
            this.updateCheckboxes();
          // });
          
  
        } else {
  
          this.zoneList = res.data;
  
        }
      }
    });
  }
      }
      else {
  
        this.zoneList = [];
        this.schoolList = [];
        this.participantsList = [];
        this.participantsListSearch = [];
        this.selectedItems = [];
      }
    }
  
    /**
     * It's a function that gets called when the user selects a zone from the dropdown
     */
    selectedZoneFilter(event:any) {
      const id=event.target.value;
      console.log("ji",id);
      this.schoolList = [];
      
      this.clearParticipants();
  
      if (this.zfilter != '') {
  
        this.spinner.show();
        var schtype = this.schoolTypeid;
  
        if(id=='ALL_BLOCK'){
          this.ss.getSchools({dropdownfilter: this.zfilter, school_type: schtype, wildcard: ''}).subscribe((res: { api_status: boolean; data: any; }) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
            if(this.eventDet.pCategory === 'SCHOOL') {
              // this.ss.getSchl({dropdownfilter: this.zfilter, wildcard: ''}).subscribe((res) => {
              this.participantsList = res.data.slice(1);
              this.participantsListSearch = res.data.slice(1);
              this.updateCheckboxes();
            // })
             
  
            } else {
  
              this.schoolList = res.data;
  
            }
          }
  
  
        });
      }
      else{
          this.ss.getSchl({dropdownfilter: this.zfilter, school_type: schtype, wildcard: ''}).subscribe((res: { api_status: boolean; data: any; }) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
            if(this.eventDet.pCategory === 'SCHOOL') {
              // this.ss.getSchl({dropdownfilter: this.zfilter, wildcard: ''}).subscribe((res) => {
              this.participantsList = res.data.slice(1);
              this.participantsListSearch = res.data.slice(1);
              this.updateCheckboxes();
            //  })
             
  
            } else {
  
              this.schoolList = res.data;
  
            }
          }
  
  
        });
      
      
      }
      }
      else {
  
        this.schoolList = [];
        this.participantsList = [];
        this.participantsListSearch = [];
        this.selectedItems = [];
      }
    }
  
    /**
     * It fetches the list of students from the server based on the school selected in the dropdown
     */
    selectedSchoolFilter() {
      
      this.clearParticipants();
  
      let params = {
        schoolid: this.sfilter,
        wildcard: '',
        dropdown_filter: [
          {cat: 'STD',  value: this.eventDet.classStd},
          {cat: 'SECTION',  value: this.eventDet.section},
          {cat: 'GROUP',  value: this.eventDet.group},
          {cat: 'MEDIUM',  value: this.eventDet.medium},
        ]
      }
  
      if (this.sfilter != '') {
  
        this.spinner.show();
  
        this.ss.getStudents(params).subscribe((res: { api_status: boolean; data: any; }) => {
  
          this.spinner.hide();
  
          if(res.api_status === true) {
  
              this.participantsList = res.data;
              this.participantsListSearch = res.data;
  
              this.updateCheckboxes();
  
          }
  
        });
      }
      else {
  
        this.participantsList = [];
        this.participantsListSearch = [];
        this.selectedItems = [];
      }
    }
  
    /**
     * If the user selects a checkbox, the item is added to the selectedItems array. If the user
     * unselects a checkbox, the item is removed from the selectedItems array
     * @param {any} selected - any, id: any
     * @param {any} id - The id of the item that was selected.
     */
    itemSelected(selected: any, id: any) {
  
      // if(selected.name === 'ALL_DISTRICT' || selected.name === 'ALL_BLOCK' || selected.name === 'ALL_SCHOOLS') {
  
      //   this.selectedItems.forEach((i1: any) => { this.deleteSelected(i1.id)});
  
      //   this.selectedItems = [];
  
      //   this.participantsListSearch = this.participantsListSearch.map((i: any) => ({...i, selected: false}))
      // }
      
  
      if (selected.checked) {
  
        let item = this.participantsListSearch.find((x: { id: any; }) => x.id == id);
  
        item['participant_category'] = this.eventDet.pCategory;
        item['name'] = item.value;
        item['invited'] = true;
        item['participated'] = false;
        item['selected'] = true;
  
        console.log(item);
        this.selectedItems.push(item);
        // console.log(this.selectedItems);
  
        // this.selectedItems.forEach((ss: any) =>{
          
        //   if(this.selectedItems.length > 1 && ss.id == 'ALL_DISTRICT') {
        //     this.deleteSelected('ALL_DISTRICT')
            
        //   }
          
        // });      
  
      }
      else {
  
        if (this.selectedItems.length > 0) {
  
          let index = this.selectedItems.findIndex((x: { id: any; }) => x.id == id);
  
          // // console.log(index);
  
          this.selectedItems.splice(index, 1);
  
        }
      }
    }
  
    /**
     * It finds the index of the item in the selectedItems array that has the same id as the id passed
     * in, and then removes that item from the array
     * @param {any} id - The id of the item to be deleted.
     */
    deleteSelected(id: any) {
  
      let index = this.selectedItems.findIndex((x: { id: any; }) => x.id == id);
  
      this.selectedItems.splice(index, 1);
  
      this.participantsListSearch.find((x: any) => x.id == id).selected = false;
  
    }
  
    createBtnClicked() {
      this.selectedStreamName = '';
      this.btnType = true;
  
      if (this.neet2jee === '0') {
        this.eventDet.competitive_exam = '';
        console.log('Inside if: this.eventDet.competitive_exam', this.eventDet.competitive_exam);
      }
      else
      {
        console.log('Inside if: this.eventDet.competitive_exam', this.eventDet.competitive_exam);
      }
      
      this.neet2jee = '0';
    }
  
    handleResetClick() {
      this.selectedStreamName = ''; // Reset the selectedStreamName
    }
  
    allocateBtnClicked() {
      this.selectedStreamName = '';
      this.btnType = false;
    }
  
  
  
    /**
     * It creates a schedule and maps participants to the schedule
     */
    onClickSubmit() {
      this.selectedStreamName = '';    // // console.log(this.btnType);
      
  
      let formValues = this.scheduleForm.value;
  
  
      formValues['isAllDay'] = this.eventDet.isAllDay;
      formValues['startDate'] = `${this.eventDet.startDate.year}-${this.eventDet.startDate.month}-${this.eventDet.startDate.day}`;
      formValues['endDate'] = `${this.eventDet.endDate.year}-${this.eventDet.endDate.month}-${this.eventDet.endDate.day}`;
  
      if(this.eventDet.competitive_exam !== 'on')
      {
        formValues['competitive_exam'] = this.eventDet.competitive_exam;
      }
  
      let s_id: any[] = [];
  
      // if(this.stream_id.length > 0)
      // {
      //   for(let i=0; i<this.stream_id.length; i++ )
      //   {
      //     console.log('stream id', this.stream_id[i]);
  
      //     s_id = [`${this.stream_id[i]}`]
  
      //     console.log('s_id', s_id)
      //   }
      // }
  
      let scheduleid: any;
  
      this.eventDet.schtype = this.schoolTypeid;
      console.log(this.eventDet.schtype)
  
      console.log("this", this.eventDet.competitive_exam);
  
      if (this.neet2jee === '0') {
        this.eventDet.competitive_exam = '';
        console.log('Inside if: this.eventDet.competitive_exam', this.eventDet.competitive_exam);
      }
  
      formValues['schtype'] = '['+this.eventDet.schtype+']';
  
      this.spinner.show();
  
      this.ss.createSchedule(formValues).subscribe((res: { api_status: any; schedule_id: any; qp_allocate_url: string | URL | undefined; message: string | undefined; }) => {
  
        // this.spinner.hide();
  
        // // console.log(res);
  
        if (res.api_status) {
  
          scheduleid = res.schedule_id;
  
          // this.spinner.show();
  
          this.ss.mapParticipants(this.selectedItems, scheduleid).subscribe((res1: { api_status: boolean; message: string | undefined; }) => {
  
            this.spinner.hide();
  
            // // console.log(res);
  
            if(res1.api_status === true) {
  
              this.eventDet = {
                title: '',
                type: '',
                location: '',
                color: '#eb0000',
                classStd: '',
                section: '',
                stream: '',
                subject: '',
                medium: '',
                isAllDay: false,
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                repeat: 1,
                batchs: 1,
                pCategory: '',
                group: '',
              }
      
              this.scheduleForm.reset();
      
              this.selectedItems = [];
              this.participantsList = [];
      
              if (this.btnType) {
      
                Swal.fire(
                  // 'Created',
                  `Quiz created successfully`,
                  `Event Id - ${scheduleid}`,
                  'success'
                )
              } else {
      
                Swal.fire({
                  title: 'Schedule Created Successfully',
                  icon: 'success',
                  // html: `You are being redirect to the question Paper <br> allocation page in <br><br><span id="countdown"></span>`,
                  html: `Event Id - ${scheduleid} </span><br> <div>  </div>You are being redirected to the question Paper <br> allocation page in <br><br><span id="countdown"></span>`,
                  showDenyButton: false,
                  showCancelButton: false,
                  allowOutsideClick:false,
                  allowEscapeKey:false,
                  allowEnterKey:false,
                  showConfirmButton:false
                  // confirmButtonText: 'OK',
                  // denyButtonText: `Don't save`,
                });
                let countdownValue=5;
                
                const countdownInterval=setInterval(() =>{
                  countdownValue--;
                  const countdownElement=document.getElementById('countdown');
                  if(countdownElement){
                    countdownElement.innerHTML=`${countdownValue} seconds`;
                  }
                  if(countdownValue===0){
                    clearInterval(countdownInterval);
  
                    if (res.qp_allocate_url != "") {
                      const newTab = window.open(res.qp_allocate_url, '_blank');
                      if (newTab) {
                        newTab.focus();
                      } else {
                        window.location.href = `${res.qp_allocate_url}`
                      }
                      Swal.close();
                    } else {
                      Swal.fire('You are not allowed to allocate', '', 'info')
                    }
                  }
                },1000);
      
              }
    
            } else {
  
              Swal.fire(res1.message, '', 'error');
  
            }
  
            
          },
            (err: any) => {
              // // console.log(err);
              Swal.fire('Error in mapping participants', 'error');
            });
          
        } else {
  
          this.spinner.hide();
  
          Swal.fire(res.message, '', 'error');
        }
  
      },
        (err: any) => {
  
          // // console.log(err);
  
          Swal.fire('Error', 'Error in creating schedule', 'error');
  
        });
  
  
    }
  
  
    /**
     * It takes a search term and filters the list of participants based on that search term
     * @param {any} term - any - The search term that the user has entered.
     */
    SearchData(term: any) {
      // // console.log(term);
      if (term.length > 0) {
  
        let paticipants = this.participantsListSearch;
  
        this.participantsListSearch = paticipants.filter((x: any) => x.value.toLowerCase().indexOf(term.toLowerCase()) > -1);
  
        this.updateCheckboxes()
  
      }
      else {
  
        this.participantsListSearch = this.participantsList;
  
        this.updateCheckboxes();
  
      }
  
    }
  
    updateCheckboxes() {
  
      this.participantsListSearch.forEach((psearch: any, index: number) => {
  
        let selected = this.selectedItems.find((x: { id: any; }) => x.id == psearch.id);
  
        if (selected != undefined) {
          this.participantsListSearch[index]['selected'] = true;
        }
      })
    }
  
  
    /**
     * It validates the date range of the start and end date of the event
     */
    validateRange() {
  
      if(!this.eventDet.startDate?.year) {
        
        this.eventDet.startDate = this.eventDet.startDate.trim();
  
      }
      
      let sDate = `${this.eventDet.startDate.year}-${this.eventDet.startDate.month}-${this.eventDet.startDate.day}`;
      let eDate = `${this.eventDet.endDate.year}-${this.eventDet.endDate.month}-${this.eventDet.endDate.day}`;
      
  
      let startDate = moment(sDate, 'YYYY-MM-DD');
      let endDate = moment(eDate, 'YYYY-MM-DD');
  
      if(this.eventDet.startDate == '') {
  
        this.setMinDateForPicker();
  
      } else {
  
        this.minDate = this.eventDet.startDate;
  
        let eDay = moment(sDate, 'YYYY-MM-DD').add(this.ss.restrictDays, 'days').format('YYYY-MM-DD');
  
        this.maxDate = {
          year: parseInt(eDay.split('-')[0]),
          month: parseInt(eDay.split('-')[1]),
          day: parseInt(eDay.split('-')[2]),
        };
      }
  
  
      if (!startDate.isSameOrBefore(endDate)) {
        this.eventDet.endDate = '';
      }
  
  
  
    }
  
    /**
     * It takes the start date and end date and compares them to see if the start date is before the end
     * date. If it is not, it clears the end date
     */
    validateDateTimeRange() {
  
      let sDate = `${this.eventDet.startDate.year}-${this.eventDet.startDate.month}-${this.eventDet.startDate.day}`;
      let eDate = `${this.eventDet.endDate.year}-${this.eventDet.endDate.month}-${this.eventDet.endDate.day}`
  
      let startDate = moment(`${sDate} ${this.eventDet.startTime}`, 'YYYY-MM-DD HH:mm:ss');
      let endDate = moment(`${eDate} ${this.eventDet.endTime}`, 'YYYY-MM-DD HH:mm:ss');
      
      if (!startDate.isSameOrBefore(endDate)) {
        this.eventDet.endTime = '';
      }
      
    }
  
    /**
     * It sets the minimum date for the date picker to the current date and the maximum date to the
     * current date plus the number of days specified in the settings
     */
    setMinDateForPicker() {
  
      let tDay = moment().format('YYYY-MM-DD');
  
      this.minDate = {
        year: parseInt(tDay.split('-')[0]),
        month: parseInt(tDay.split('-')[1]),
        day: parseInt(tDay.split('-')[2]),
      };
      
      let eDay = moment().add(this.ss.restrictDays, 'days').format('YYYY-MM-DD');
  
      this.maxDate = {
        year: parseInt(eDay.split('-')[0]),
        month: parseInt(eDay.split('-')[1]),
        day: parseInt(eDay.split('-')[2]),
      };
  
      this.minDateStart = {
        year: parseInt(tDay.split('-')[0]),
        month: parseInt(tDay.split('-')[1]),
        day: parseInt(tDay.split('-')[2]),
      }
  
  
    }
    Getstd(){
      this.checked = true;
      this.disabled= true;
      this.ss.getOptionsData().subscribe((res) => {
        var stc = res.school_type_choices
        this.schoolType=[]
        this.schoolTypeid=[]
        this.schoolType.push(stc[0].value);
        this.schoolTypeid.push(stc[0].id);
         this.schoolType = [...new Set(this.schoolType)];
        if(this.schoolType.length)
        {
            //console.log(1234)
            this.ss.getClass({schooltype: this.schoolType}).subscribe((res: any) => {
              //console.log(res)
              if(res.api_status === true) { 
                  this.choiceList.std_choices = res.std_list
                  //console.log(this.choiceList.std_choices)
              }
            })
        }
        else {  
          this.choiceList.std_choices = [];
          this.streamChoices = [];
          this.subjectChoices = [];
    
          this.scheduleForm.patchValue({'classStd': '', 'subject': '', 'stream': ''});
    
        }
  
      });
    }
  
  
  // #for 1:N allocation toggle
  Allocationselect(event: MatSlideToggleChange){
      
    //console.log(12344);
    const checked = event.checked;
    const value = checked ? 1 : 0;
    this.eventDet.is_1_n = value
  
      //console.log(this.eventDet.is_1_n)
  
      if(this.eventDet.is_1_n)
      {
  
        Swal.fire({
          title: 'You are about to enable 1:N allocation where class teachers will allocate the QP',
          icon: 'success',
        
        });
        this.eventDet.is_1_n = 1;
        //this.displayText = 'Yes';
        console.log(this.eventDet.is_1_n)
      }
      else{
        Swal.fire({
          title: 'Switching Back To Normal Mode',
          icon: 'success',
        
        });
      }
      // else{
      //   this.displayText = 'No'
      // }
    }
  
    Nallocation(event: any) {
      
      this.eventDet.allowed_allocation_id = event.target.value;    
    }
  
    neetj2ee(event: any){
      this.neet2jee = event.target.value;
      this.neetjee = this.choiceList.competitive_exam;
      console.log('this.neetjee',this.neetjee);
  
    
     if (this.neet2jee === '0') {
       this.eventDet.competitive_exam = '';
       console.log('Inside if: this.eventDet.competitive_exam', this.eventDet.competitive_exam);
      //  this.scheduleForm.get('competitive_exam').clearValidators();
      this.scheduleForm.get('competitive_exam')?.clearValidators(); 
        // this.scheduleForm.get('endTime')?.clearValidators(); 
     }
     else {
       this.eventDet.competitive_exam = 7;
  
      //  this.scheduleForm.get('competitive_exam').setValidators([Validators.required]);
      this.scheduleForm.get('competitive_exam')?.addValidators(Validators.required);
      
      //  this.scheduleForm.get('startTime')?.addValidators(Validators.required)
      //  this.scheduleForm.get('endTime')?.addValidators(Validators.required)
     }
     
     console.log('After if-else: this.eventDet.competitive_exam', this.eventDet.competitive_exam);
      
    }
  
    neeetj2ee(event: any){
      this.eventDet.competitive_exam = event.target.value;
  
      // this.cdr.detectChanges();
  
      console.log('event.target.value',event.target.value);
      console.log('this.eventDet.competitive_exam ',this.eventDet.competitive_exam );
    }
  }