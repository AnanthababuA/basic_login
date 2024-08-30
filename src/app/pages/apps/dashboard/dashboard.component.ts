import { Component, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

import { DashboardService } from 'src/app/services/dashboard.service';

interface SchoolType {
  id: number;
  value: string;
}

interface Schoolcate {
  id: number;
  value: string;
}

interface DistrictType {
  id: number;
  value: string;
}

interface blockType {
  Block_id: number;
  Block_name: string;
}


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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // providers: [
  //   { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }
  // ],
})
export class DashboardComponent {

  block_graph: boolean = false;

  maxDisplayCount = 1;

  state_total_schools = 0;
  state_allocation = 0;
  state_qpdownload = 0;
  state_response = 0;
  
  total_students = 0;
  attended_students = 0;

  desc_tot_schoosl = 0;
  desc_tot_qpdown = 0;
  desc_tot_anskey = 0;

  districts_name: any;
  block_data: any;

  // classvalue: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  classvalues: number[] = [];
  selectclschecked: boolean = false;

  emisUserType: any;

  classvalue = Array.from({ length: 12 }, (_, index) => ({
      label: (index + 1).toString(),
      value: index + 1
    }));
    
  classListWithSelectAll = [{ value: 'Select All', label: 0 }, ...this.classvalue];
  selectedClasses: any[] = [];

  selectedMedium:  number[] = [];

  selectedschooltype: any;
  selectedschoolcattype: any;

  medium_list = [
      { id: 19, value: "English" },
      { id: 18, value: "Urdu" },
      { id: 17, value: "Telugu" },
      { id: 16, value: "Tamil" },
      { id: 8, value: "Malayalam" },
      { id: 5, value: "Kannada" }
    ];

  event_details: any[] = [];

  status: any[] = [];
  block_status: any[] = [];

  school_wise_list : any[] = [];

  school_sectionwise_data: any[] = [];
  school_sectionwise_notcompleteddata: any[] = [];
  schoolwise_notcompletedlist: any[] = [];

  event_type: any[] = [
    { id: 1, value: "1:N State Events" },
    { id: 2, value: "Normal State Events" },
    { id: 3, value: "School Created Events" },
    
  ];

selectedeventtype: any; 

selecteventlocation: any;

districts: any[] = [];
districtList : any[] = [];
districtIds: number[] = [];
selectedDistricts: number[] = [];

block_list: blockType[] = [];
blocklist_select_list: blockType[] = [];
selectedblocks: number[] = [];

school_cate: Schoolcate[] = [];
schoolcate_select_list: Schoolcate[] = [];

schooltype_list: SchoolType[] = [];
schooltype_select_list: SchoolType[] = [];


startDate: any = moment().format('YYYY-MM-DD');
EndDate: any = moment().format('YYYY-MM-DD');
  // EndDate: any = moment().format('DD/MM/YYYY');

startDat: any = moment().format('YYYY-MM-DD');
endDat: any = moment().format('YYYY-MM-DD');

minDate: any;
maxDate: any;
minDateStart: any;

mediumList = [
  { id: 19, value: 'English' },
  { id: 18, value: 'Urdu' },
  { id: 17, value: 'Telugu' },
  { id: 16, value: 'Tamil' },
  { id: 8, value: 'Malayalam' },
  { id: 5, value: 'Kannada' }
];

mediumListWithSelectAll = [{ id: 0, value: 'Select All' }, ...this.mediumList];

  isOnlineHighlighted: boolean = false;
  isDescriptiveHighlighted: boolean = false;

  toggleStyle(type: string) {
    if (type === 'online') {
        this.selecteventlocation = "OFFLINE";
        this.isOnlineHighlighted = true;
        this.isDescriptiveHighlighted = false;

        this.event_type = [
          { id: 1, value: "1:N State Events" },
          { id: 2, value: "Normal State Events" },
          { id: 3, value: "School Created Events" },
          
        ];
    } else {
        this.selecteventlocation = "DESCRIPTIVE";
        this.isOnlineHighlighted = false;
        this.isDescriptiveHighlighted = true;

        this.event_type = [
          { id: 1, value: "Normal State Events" },
          { id: 2, value: "School Created Events" },
          
        ]
    }

    
  }

  constructor(private DBS: DashboardService) {}

  ngOnInit(): void {    
    
    this.selectedeventtype = this.event_type[0].id; 

    this.isOnlineHighlighted = true;
    this.isDescriptiveHighlighted = false;

    this.selecteventlocation = "OFFLINE";

    this.intial_value();
 
  }

  intial_value(){
    this.selectedClasses = this.classvalue.map(item => item.label)

    this.district_details();

    this.school_category();

  }

 


  school_category(){
    this.DBS.getschoolcate_details().subscribe( (res: { api_status: any; data: any[]; }) => {
        if(res.api_status){
            this.school_cate = res.data;
            this.schoolcate_select_list = [{id:0, value: 'Select All'}, ...this.school_cate]

            const specificIds = [1];

            this.selectedschoolcattype = this.school_cate
            .filter(item => specificIds.includes(item.id))
            .map(item => item.id);

            const specificIdsMedium = [16, 19];

            this.selectedMedium = this.medium_list.filter(item => specificIdsMedium.includes(item.id))
            .map(item => item.id);

        }
    });

    this.DBS.getschooltype_details().subscribe( (res) => {
        if(res.api_status){
            this.schooltype_list = res.data;
            this.schooltype_select_list = [{ id: 0, value: 'Select All' }, ...this.schooltype_list];

            const specificIds = [4, 5];

            this.selectedschooltype = this.school_cate
            .filter(item => specificIds.includes(item.id))
            .map(item => item.id);

            
        }
    });
  }

  district_details(){

    this.DBS.getdistrict_details().subscribe( (res) => {
        if(res.api_status){
            this.districtList = res.data;

            this.districts = [{ District_id: 0, District_name: 'Select All' }, ...this.districtList]

            this.districtIds = this.districtList.map(district => district.District_id);

            this.selectedDistricts = this.districtList.map(district => district.District_id);

            this.DBS.getblock_details(this.districtIds).subscribe( (res) => {

                if(res.api_status){
                    this.block_list = res.data;
                    this.blocklist_select_list = [{ Block_id: 0, Block_name: 'Select All' }, ...this.block_list];

                    this.selectedblocks = this.block_list.map(block => block.Block_id);

                    this.triggerAllAPI();
                }
            });
        }       
    });
  }

  blockdetails(){

    console.log("this.selectedDistricts", this.selectedDistricts);

    if(this.selectedDistricts.length > 0){
        this.DBS.getblock_details(this.selectedDistricts).subscribe( (res) => {

            if(res.api_status){
                this.block_list = res.data;
                this.blocklist_select_list = [{ Block_id: 0, Block_name: 'Select All' }, ...this.block_list];

                this.selectedblocks = this.block_list.map(block => block.Block_id);
            }
        });

    }else{
        // this.district_details();
    }

   

  }

 

  validateRange(){

    if( this.startDat == ''){
    }
    else{

      this.minDate = this.startDat;
    }

  }

  endDates(event:any)
  { let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.endDat = year + "-" + month + "-" + day;

    // this.examsEventdetails()
    this.triggerAllAPI()
    
  }

  startdates(event:any)
  {  let year = event.year;
     let month = event.month <= 9 ? '0' + event.month : event.month;;
     let day = event.day <= 9 ? '0' + event.day : event.day;;
     this.startDat = year + "-" + month + "-" + day;

    //  this.examsEventdetails();
    this.triggerAllAPI()     
  }


  get selectedCount(): number {
    return this.selectedClasses.length;
  }

  get blocksCount(): number {
    return this.selectedblocks.length;
  }

  getSelectedDistrictsText(): string {
    if (this.selectedDistricts.length === 0) {
      return 'No districts selected';
    } else if (this.selectedDistricts.length === 1) {
      return `${this.selectedDistricts.length} district selected`;
    } else {
      return `${this.selectedDistricts.length} districts selected`;
    }
  }

  getSelectedblockssText(): string {
    if (this.selectedblocks.length === 0) {
      return 'No blocks selected';
    } else if (this.selectedblocks.length === 1) {
      return `${this.selectedblocks.length} block selected`;
    } else {
      return `${this.selectedblocks.length} blocks selected`;
    }
  }


  onSelecteddistrictChange(event: MatSelectChange) {
    const selectAllId = 0;
    console.log("events", event)

    // const selectAllIndex = event.findIndex(item => item.District_id === selectAllId);
    // console.log("selectAllIndex", selectAllIndex);

    // if (selectAllIndex > -1) {
    //   if (event.length === this.districts.length) {
    //     this.selectedDistricts = [];
    //   } 
    //   else {
    //     this.selectedDistricts = this.districtList.map(item => item.District_id);
    //   }
    // } else {
    //   if (event.length === this.districtList.length) {
    //     this.selectedDistricts = this.districtList.map(item => item.District_id);
    //   } else {
    //     this.selectedDistricts = event.map(item => item.District_id);
    //   }
    // }

    this.blockdetails();

    this.triggerAllAPI();
  }

  onSelectedblockChange(event: MatSelectChange) {
    const selectAllId = 0;

    // const selectAllIndex = event.findIndex(item => item.Block_id === selectAllId);

    // if (selectAllIndex > -1) {
    //   if (event.length === this.blocklist_select_list.length) {
    //     this.selectedblocks = [];
    //   } 
    //   else {
    //     this.selectedblocks = this.block_list.map(item => item.Block_id);
    //   }
    // } else {
    //   if (event.length === this.block_list.length) {
    //     this.selectedblocks = this.block_list.map(item => item.Block_id);
    //   } else {
    //     this.selectedblocks = event.map(item => item.Block_id);
    //   }
    // }

    this.triggerAllAPI();
  }

  onSelectedschoolChange(event: MatSelectChange) {
    const selectAllId = 0;

    // const selectAllIndex = event.findIndex(item => item.id === selectAllId);

    // if (selectAllIndex > -1) {
    //   if (event.length === this.schooltype_select_list.length) {
    //     console.log("if loop")
    //     this.selectedschooltype = [];
    //   } 
    //   else {
    //     console.log("else loop")
    //     this.selectedschooltype = this.schooltype_list.map(item => item.id);
    //   }
    // } else {
    //   if (event.length === this.mediumList.length) {
    //     this.selectedschooltype = this.schooltype_list.map(item => item.id);
    //   } else {
    //     this.selectedschooltype = event.map(item => item.id);
    //   }
    // }

    this.triggerAllAPI();
  }

  onSelectedschooltype(event: any){
    this.selectedeventtype = event.id;  

    this.triggerAllAPI();
  }


  isSelected(value: number): boolean {
    return this.selectedClasses.includes(value);
  }


  onSelectedClassesChange(event: MatSelectChange) {
    const selectAllId = 0;
    // const selectAllIndex = event.findIndex(item => item.label === selectAllId);

    // console.log("selectAllIndex", selectAllIndex,selectAllId, event )

    // if (selectAllIndex > -1) {
    //   if (event.length === this.classListWithSelectAll.length) {
    //     this.selectedClasses = [];
    //   } else {
    //     this.selectedClasses = this.classvalue.map(item => item.label);
    //   }
    // } else {
    //   // "Select All" is not selected
    //   if (event.length === this.classvalue.length) {
    //     // All other options are selected
    //     this.selectedClasses = this.classvalue.map(item => item.label);
    //   } else {
    //     // Individual options are selected
    //     this.selectedClasses = event.map(item => item.label);
    //   }
    // }

    this.triggerAllAPI();
  }


  class_value(event: any) {
    this.classvalues = event.value;
    console.log('this classvalues', this.classvalues);
    this.selectclschecked = this.classvalues.length === this.classvalue.length;

    if (this.classvalues.length > 0) {
    } else {
      // Handle the empty selection case
    }
  }

  getSelectedclassText(): string {
    if (this.classvalues && this.classvalues.length > 0) {
      if (this.classvalue.length === 1) {
        const selectedClass = this.classvalues[0];
        return `Class ${selectedClass} selected`;
      } else {
        return `${this.classvalues.length} classes selected`;
      }
    }
    return 'Select class';
  }




onSelectionMediumChange(event: MatSelectChange) {
    const selectAllId = 0;

    // const selectAllIndex = event.findIndex(item => item.id === selectAllId);

    // if (selectAllIndex > -1) {
    //   if (event.length === this.mediumListWithSelectAll.length) {
    //     console.log("if loop")
    //     this.selectedMedium = [];
    //   } 
    //   else {
    //     console.log("else loop")
    //     this.selectedMedium = this.mediumList.map(item => item.id);
    //   }
    // } else {
    //   if (event.length === this.mediumList.length) {
    //     this.selectedMedium = this.mediumList.map(item => item.id);
    //   } else {
    //     this.selectedMedium = event.map(item => item.id);
    //   }
    // }

    this.triggerAllAPI();
  }

  onSelectionCategoryChange(event: MatSelectChange) {
    const selectAllId = 0;

    // const selectAllIndex = event.findIndex(item => item.id === selectAllId);

    // if (selectAllIndex > -1) {
    //   if (event.length === this.schoolcate_select_list.length) {
    //     console.log("if loop")
    //     this.selectedschoolcattype = [];
    //   } 
    //   else {
    //     console.log("else loop")
    //     this.selectedschoolcattype = this.school_cate.map(item => item.id);
    //   }
    // } else {
    //   if (event.length === this.school_cate.length) {
    //     this.selectedschoolcattype = this.school_cate.map(item => item.id);
    //   } else {
    //     this.selectedschoolcattype = event.map(item => item.id);
    //   }
    // }
    this.triggerAllAPI();
  }

  get MediumCount(): number {
    if (!this.selectedMedium) {
        return 0;
      }
      return this.selectedMedium.length;
  }

  get schoolcateCount(): number {
    if (!this.selectedschoolcattype) {
        return 0;
      }
      return this.selectedschoolcattype.length;
  }

 get schooltypeCount(): number {
    // Add null or undefined check
    if (!this.selectedschooltype) {
      return 0;
    }
    return this.selectedschooltype.length;
  }

  triggerAllAPI(){
    // this.examsEventdetails();
    if(this.emisUserType === "5"){
      this.districtwiseExamsdetails();
    } else if(this.emisUserType === "19"){
      this.districtwiseExamsdetails();
    } else if(this.emisUserType === "2"){
      this.districtwiseExamsdetails();
    }
    

  }

  formatDate(date: { year: number; month: number; day: number }): string {
    const year = date.year;
    const month = date.month.toString().padStart(2, '0'); // Ensure month is two digits
    const day = date.day.toString().padStart(2, '0');     // Ensure day is two digits

    return `${year}-${month}-${day}`;
}


  examsEventdetails(){
    const s_date = this.formatDate(this.startDate)
    const e_date = this.formatDate(this.EndDate)

    const params = {
        start_date: s_date, end_date: e_date, event1n: this.selectedeventtype, event_type: this.selecteventlocation,
        class_sec: this.selectedClasses, Medium_ids: this.selectedMedium, school_cate: this.selectedschoolcattype, school_type: this.selectedschooltype,
    }

    this.DBS.getevent_details(params).subscribe( (res) => {
        console.log("Res API", res)
        if(res.api_status){
            this.event_details = res.Event_data;
        }
    } );

    console.log("API params", params)
  }

  districtwiseExamsdetails(){
    const s_date = this.formatDate(this.startDate)
    const e_date = this.formatDate(this.EndDate)

    const params = {
        start_date: s_date, end_date: e_date, event1n: this.selectedeventtype, event_type: this.selecteventlocation,
        class_sec: this.selectedClasses, Medium_ids: this.selectedMedium, school_cate: this.selectedschoolcattype, 
        school_type: this.selectedschooltype, district_ids: this.selectedDistricts, block_ids: this.selectedblocks,
    }

    // this.event_details = [];
    // this.school_wise_list = [];
    // this.status = [];
    // this.state_total_schools = 0;
    // this.state_allocation = 0;
    // this.state_qpdownload = 0;
    // this.state_response = 0;
    // this.block_data = []; 

    this.DBS.getdistrictwise_status(params).subscribe( (res) => {
        console.log("Res API", res)
        if(res.api_status){
          if(this.emisUserType === "5"){
            this.event_details = res.Event_data;
            this.school_wise_list = res.School_data;
            this.school_sectionwise_data = res.School_section_data;
            this.school_sectionwise_notcompleteddata = res.school_notcompleted_ass;
            this.schoolwise_notcompletedlist = res.unique_school,
            this.status = res.assessment_status1;
            this.state_total_schools = res.total_schools;
            this.state_allocation = res.total_school_allocation;
            this.state_qpdownload = res.download_count;
            this.state_response = res.response_count;
            this.block_data = res.assessment_blockwise_status; 
            // this.createchart()  
        }else if(this.emisUserType === "19"){  
            this.event_details = res.Event_data;
            this.school_wise_list = res.School_section_data;
            this.status = res.assessment_blockwise_status;
            this.state_total_schools = res.total_sections;
            this.state_allocation = res.total_section_allocation;
            this.state_qpdownload = res.section_download_count;
            this.state_response = res.section_response_count;
            this.block_data = res.assessment_blockwise_status;
            // this.createchart1();
        }else if(this.emisUserType === "2"){
          this.event_details = res.Event_data;
            this.school_wise_list = res.School_section_data;
            this.status = res.School_section_data;
            this.state_total_schools = res.total_sections;
            this.state_allocation = res.total_section_allocation;
            this.state_qpdownload = res.section_download_count;
            this.state_response = res.section_response_count;
            this.block_data = res.assessment_blockwise_status;    
           
        }
            
            // this.initializeChart();
            // this.createchart()

        }
    } );

    console.log("API params", params)
  }


}