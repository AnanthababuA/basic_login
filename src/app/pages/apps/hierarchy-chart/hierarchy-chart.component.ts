import { Component, AfterViewInit ,Renderer2} from '@angular/core';
import OrgChart from "@balkangraph/orgchart.js";
// import { editBegin } from '@syncfusion/ej2-angular-grids';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

interface OrgChartDataNode {
  id: number;
  name: string;
  pid?: number;
  Total_clients?: string; 
  Sub_clients?: string;
  Blocked_Clients?: string;
  Policy?:string;
  Patch?: string;
  Clam?: string;
  unit_id?:string;
 
}
@Component({
  selector: 'app-hierarchy-chart',
  templateUrl: './hierarchy-chart.component.html',
  styleUrls: ['./hierarchy-chart.component.scss'],
})
export class HierarchyChartComponent {
  loaderStatus: string = 'Loading...';

  private chart: OrgChart | any;
  private currentScale =0.7;
  user:any;
  constructor(private spinner: NgxSpinnerService,private renderer: Renderer2,private common: CommonServicesService,private ts: TokenStorageService) {}
  ngOnInit() {
    // this.spinner.show();
  }
  ngAfterViewInit() {
console.log("spinner")
    const tree = document.getElementById('tree');
    this.spinner.show();
    const newHeight = 1500;
// const newWidth=1500
   OrgChart.templates['isla'].size = [180, 246]; 
    OrgChart.templates['isla'].node =

    '<rect filter="url(#isla-shadow)" x="0" y="-200" rx="7" ry="7" height="206" width="180" fill="#FFF" stroke-width="1" stroke="#039BE5"></rect>' +
    '<rect x="12" y="-175" rx="10" ry="10" height="25" width="155" fill="#039BE5" stroke-width="3" stroke="#039BE5"></rect>' +
    '<rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="-226" rx="13" ry="13" width="40" height="40"></rect>' +
    '<image x="75" y="-222" width="31" height="31" href="assets/images/unit3.png"></image>'; 

  OrgChart.templates['isla']['field_0'] =
  '<text data-width="120" style="font-size: 17px; font-weight: bold; font-family: Arial, sans-serif;" fill="#fff" x="90" y="-156" text-anchor="middle">{val}</text>';
 
  OrgChart.templates['isla']['field_2'] =
  '<text data-width="160" style="font-size: 15px;" fill="#00308F " x="19" y="-121.4" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  
   OrgChart.templates['isla']['field_4'] =
  '<text data-width="160" style="font-size: 15px;" fill="#00308F " x="19" y="-95" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  OrgChart.templates['isla']['field_5'] =
  
    '<circle cx="35" cy="-75" r="5" fill="#ff0000"></circle>' +
  '<text data-width="160" style="font-size: 15px;" fill="#580000" x="49" y="-68.6" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>'

  OrgChart.templates['isla']['field_6'] =
  '<circle cx="35" cy="-49.2" r="5" fill="#17B169"></circle>' +

  '<text data-width="160" style="font-size: 15px;" fill="#580000" x="49" y="-42.2" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';

  OrgChart.templates['isla']['field_7'] =
  '<circle cx="35" cy="-22" r="5" fill="#ff0000"></circle>' +
  '<text data-width="160" style="font-size: 15px;" fill="#580000" x="49" dy="-17" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';


  OrgChart.templates['isla'].minus = 
  '<circle cx="15" cy="-225" r="12" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle>' +

  '<line x1="4" y1="-225" x2="28" y2="-225" stroke-width="1" stroke="#039BE5"></line>';


  OrgChart.templates['isla'].plus = 
  '<circle cx="15" cy="-225" r="12" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle>' +
  '<line x1="15" y1="-214" x2="15" y2="-238" stroke-width="1" stroke="#039BE5"></line>' +
  '<line x1="4" y1="-225" x2="28" y2="-225" stroke-width="1" stroke="#039BE5"></line>';
  OrgChart.templates['isla'].link = '<path stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="#FFCA28" stroke-width="1" d="{rounded}" style="transform: translate(1px, -224.9px);" />';



    if (tree) {
      console.log("dsf")
      tree.style.height = `${newHeight}px`;
      // tree.style.width = `${newWidth}px`;

      this.chart = new OrgChart(tree, {
       
        template: "isla",
        enableSearch: false,
        showYScroll: OrgChart.scroll.visible,
        showXScroll: OrgChart.scroll.visible,
        mouseScrool: OrgChart.action.none,

        nodeBinding: {
          field_0: "name",
          field_2: "Total_clients",
          // field_3: "Sub_clients",
          field_4: "Blocked_Clients",
          field_5: "Policy",
          field_6: "Patch",
          field_7: "Clam",
        
        },       
        editForm:undefined,
        collapse: {
          level: 1, 
          
          allChildren: true, 
        },
  
      });        
      this.common.hierarchy().subscribe((res) => {
        console.log("api")
        if (res.api_status === true) {
          this.spinner.hide();     
          const rawData = res;
        const data = this.transformData(rawData.data);
        this.chart.load(data);
         // Scroll to the middle of the container
    const treeContainer = document.getElementById('tree-container');
    if (treeContainer) {
      const middleScroll = (treeContainer.scrollHeight - treeContainer.clientHeight) / 2.5;
      treeContainer.scrollTop = middleScroll;
    }
   
        }
        else{
        this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: `${res.message}`,
          });
          
        }
      
       document.getElementById('min')?.addEventListener('click', () => this.minimizeChart());
       document.getElementById('max')?.addEventListener('click', () => this.maximizeChart());
      });
      
    }
  }
  minimizeChart() {
    this.zoomOut();
  }

  maximizeChart() {
    this.zoomIn();
  }

  transformData(data: any[]): OrgChartDataNode[] {
    const result: OrgChartDataNode[] = [];

    const traverse = (node: any, parentId?: number) => {
      const tabSpace = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; 
      const tabSpace1 = '&nbsp;'; 
     
      const newNode: OrgChartDataNode = {
        id: node.unit_id,
        name: node.name,
        pid: parentId,
        Total_clients: `<a href="#totalClients">Total Clients${tabSpace} :${tabSpace1}${tabSpace1}${node.total_client}</a>`,
        // Sub_clients: `<a href="#subClients">Sub-Clients${tabSpace}${tabSpace1}:${tabSpace1}${node.total_sub_client}</a>`,
        Blocked_Clients: `<a href="#blockedClients">Blocked Clients${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.blocked_client}</a>`,
 
        Policy: `<a>Policy${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.policy}</a>`,
        Patch: `<a>Patch ${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.patch}</a>`,
        Clam: `<a>Clam${tabSpace1}${tabSpace1}${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.clam}</a>`,
        // Policy: `<div  class="dot-policy"></div>Policy${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.policy}`,
        // Patch: `<div  class="dot-patch"></div>Patch ${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.patch}`,
        // Clam: `<div class="dot-clam"></div>Clam${tabSpace1}${tabSpace1}${tabSpace1}${tabSpace1}:${tabSpace1}${tabSpace1}${node.clam}`,
      
      };
      result.push(newNode);

      if (node.children && node.children.length > 0) {
        for (const childNode of node.children) {
          traverse(childNode, node.unit_id);
        }
      }
    };
    for (const topLevelNode of data) {
      traverse(topLevelNode);
    }
    

    return result;
  } 

  zoomIn() {
    this.currentScale = Math.min(2, this.currentScale + 0.1);
    this.chart!.setScale(this.currentScale);
  }

  
  zoomOut() {
    this.currentScale = Math.max(0.5, this.currentScale - 0.1);
    this.chart!.setScale(this.currentScale);
  }
  }
      
  





















  // OrgChart.templates['isla']['field_6'] =
//   '<g transform="translate(0, -51)">' +
//     '<circle cx="35" cy="5" r="5" fill="green"></circle>' +
//     '<text data-width="160" style="font-size: 15px;" fill="#580000" x="46" y="10" text-anchor="start">' +
//       '<tspan font-weight="bold">{val}</tspan>' +
//     '</text>' +
//   '</g>';
  //       '<tspan font-weight="bold">{val}</tspan>' +
  //     '</text>'
//   '<g transform="translate(0, -76)">' +
//     '<circle cx="35" cy="5" r="5" fill="red"></circle>' +
//     '<text data-width="160" style="font-size: 15px;" fill="#580000" x="46" y="10" text-anchor="start">' +
//       '<tspan font-weight="bold">{val}</tspan>' +
//     '</text>' +
//   '</g>';

// OrgChart.templates['isla']['field_6'] =
//   '<g transform="translate(0, -51)">' +
//     '<circle cx="35" cy="5" r="5" fill="green"></circle>' +
//     '<text data-width="160" style="font-size: 15px;" fill="#580000" x="46" y="10" text-anchor="start">' +
//       '<tspan font-weight="bold">{val}</tspan>' +
//     '</text>' +
//   '</g>';

// OrgChart.templates['isla']['field_7'] =
//   '<g transform="translate(0, -26)">' +
//     '<circle cx="35" cy="5" r="5" fill="red"></circle>' +
//     '<text data-width="160" style="font-size: 15px;" fill="#580000" x="46" y="10" text-anchor="start">' +
//       '<tspan font-weight="bold">{val}</tspan>' +
//     '</text>' +
//   '</g>';
  
  // import { Component, AfterViewInit ,Renderer2} from '@angular/core';
  // import OrgChart from "@balkangraph/orgchart.js";
  // // import { editBegin } from '@syncfusion/ej2-angular-grids';
  // import { CommonServicesService } from 'src/app/services/common-services.service';
  // import { TokenStorageService } from 'src/app/services/token-storage.service';
  // import { NgxSpinnerService } from 'ngx-spinner';
  
  // interface OrgChartDataNode {
  //   id: number;
  //   name: string;
  //   pid?: number;
  //   Total_clients?: string; 
  //   Sub_clients?: string;
  //   Blocked_Clients?: string;
  //   Policy?:string;
  //   Patch?: string;
  //   Clam?: string;
  //   unit_id?:string;
   
  // }
  // @Component({
  //   selector: 'app-hierarchy-chart',
  //   templateUrl: './hierarchy-chart.component.html',
  //   styleUrls: ['./hierarchy-chart.component.scss'],
  // })
  // export class HierarchyChartComponent {
  //   loaderStatus: string = 'Loading...';
  
  //   private chart: OrgChart | any;
  //   private currentScale = 1;
  //   user:any;
  //   constructor(private spinner: NgxSpinnerService,private renderer: Renderer2,private common: CommonServicesService,private ts: TokenStorageService) {}
  //   ngOnInit() {
  //     this.spinner.show();
  
  //   }
  //   ngAfterViewInit() {
  // console.log("spinner")
  //     const tree = document.getElementById('tree');
  //     // this.spinner.show();
  
  //    OrgChart.templates['isla'].size = [180, 246]; 
  //     OrgChart.templates['isla'].node =
  
  //     '<rect filter="url(#isla-shadow)" x="0" y="-200" rx="7" ry="7" height="206" width="180" fill="#FFF" stroke-width="1" stroke="#039BE5"></rect>' +
  //     '<rect x="12" y="-175" rx="10" ry="10" height="25" width="155" fill="#039BE5" stroke-width="3" stroke="#039BE5"></rect>' +
  //     '<rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="-226" rx="13" ry="13" width="40" height="40"></rect>' +
  //     '<image x="76" y="-220" width="27" height="27" href="assets/images/unit1.png"></image>'; // Adjust width and height for the image
  
  //   OrgChart.templates['isla']['field_0'] =
  //   '<text data-width="120" style="font-size: 17px; font-weight: bold; font-family: Arial, sans-serif;" fill="#fff" x="90" y="-156" text-anchor="middle">{val}</text>';
   
  //   OrgChart.templates['isla']['field_2'] =
  //   '<text data-width="160" style="font-size: 15px;" fill="#00308F " x="19" y="-121.4" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //   OrgChart.templates['isla']['field_3'] =
  //   '<text data-width="160" style="font-size: 15px;" fill="#00308F " x="19" y="-98.6" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //   OrgChart.templates['isla']['field_4'] =
  //   '<text data-width="160" style="font-size: 15px;" fill="#00308F " x="19" y="-75" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //   // OrgChart.templates['isla']['field_5'] =
  //   // '<text data-width="160" style="font-size: 15px;" fill="#580000 " x="40" y="-51" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //   OrgChart.templates['isla']['field_5'] =
  //   '<g>' +
  //     '<circle cx="34" cy="-14" r="5" fill="red"></circle>' +
  //     '<text data-width="160" style="font-size: 15px;" fill="#580000 " x="45" y="-51" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //     +      '<tspan font-weight="bold">{val}</tspan>' +
  //     '</text>' +
  //   '</g>';
  //   OrgChart.templates['isla']['field_6'] =
  //   '<g>' +
  //     '<circle cx="34" cy="-56" r="5" fill="red"></circle>' +
  //     '<text data-width="160" style="font-size: 15px;" fill="#580000 " x="44" y="-29.2" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //     +      '<tspan font-weight="bold">{val}</tspan>' +
  //     '</text>' +
  //   '</g>';
  //   // OrgChart.templates['isla']['field_6'] =
  //   // '<text data-width="160" style="font-size: 15px;" fill="#580000 " x="40" y="-29.2" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  //   // // OrgChart.templates['isla']['field_7'] =
  //   // '<text data-width="160" style="font-size: 15px;" fill="#580000 " x="40" y="-8.4" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>';
  
  //   OrgChart.templates['isla']['field_7'] =
  //   '<g>' +
  //     '<circle cx="34" cy="-35" r="5" fill="red"></circle>' +
  //     '<text data-width="160" style="font-size: 15px;" fill="#580000 " x="45" y="-8.4" text-anchor="start"><tspan font-weight="bold">{val}</tspan></text>' +
  //       '<tspan font-weight="bold">{val}</tspan>' +
  //     '</text>' +
  //   '</g>';
  
  //   OrgChart.templates['isla'].minus = 
  //   '<circle cx="15" cy="-224" r="12" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle>' +
  //   '<line x1="4" y1="-225" x2="28" y2="-225" stroke-width="1" stroke="#039BE5"></line>';
  
  
  //   OrgChart.templates['isla'].plus = 
  //   '<circle cx="15" cy="-225" r="12" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle>' +
  //   '<line x1="15" y1="-214" x2="15" y2="-238" stroke-width="1" stroke="#039BE5"></line>' +
  //   '<line x1="4" y1="-225" x2="28" y2="-225" stroke-width="1" stroke="#039BE5"></line>';
  //   OrgChart.templates['isla'].link = '<path stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="#FFCA28" stroke-width="1" d="{rounded}" style="transform: translate(1px, -224.9px);" />';
  
  
  
  //     if (tree) {
  //       // this.spinner.show();
  
  //       this.chart = new OrgChart(tree, {
         
  //         template: "isla",
  //         enableSearch: false,
  //         showYScroll: OrgChart.scroll.visible,
  //         showXScroll: OrgChart.scroll.visible,
  //         mouseScrool: OrgChart.action.none,
  
  //         nodeBinding: {
  //           field_0: "name",
  //           // field_1: "unit_id",
  //           field_2: "Total_clients",
  //           field_3: "Sub_clients",
  //           field_4: "Blocked_Clients",
  //           field_5: "Policy",
  //           field_6: "Patch",
  //           field_7: "Clam",
          
  //         },       
  //         editForm:undefined,
  //         collapse: {
  //           level: 1, 
  //           allChildren: true, 
  //         },
    
         
  //       });
  
  //       this.common.hierarchy().subscribe((res) => {
  //         if (res.api_status === true) {
  //           this.spinner.hide();     
  //              const rawData = res;
  //         // console.log("rowdata",rawData)
  //         const data = this.transformData(rawData.data);
  //         this.chart.load(data);
  //         }
  //        document.getElementById('min')?.addEventListener('click', () => this.minimizeChart());
  //        document.getElementById('max')?.addEventListener('click', () => this.maximizeChart());
  //       });
        
  //     }
  //   }
  //   minimizeChart() {
  //     this.zoomOut();
  //   }
  
  //   maximizeChart() {
  //     this.zoomIn();
  //   }
  //   transformData(data: any[]): OrgChartDataNode[] {
  //     const result: OrgChartDataNode[] = [];
  
  //     // const traverse = (node: any, parentId?: number) => {
  //     //   const newNode: OrgChartDataNode = {
  //     //     id: node.unit_id,
  //     //     name: node.name,
  //     //     pid: parentId,
  //     //     // unit_id: `Unit_id : ${node.unit_id}`,
  //     //     Total_clients: `<a href="#totalClients"> Total Clients: ${node.total_client}</a>`,
  //     //     Sub_clients: `<a href="#subClients">Sub-Clients:${node.total_sub_client}</a>`,
  //     //     Blocked_Clients: `<a href="#blockedClients">Blocked Clients:${node.blocked_client}</a>`,
  //     //     // Total_clients:`Total_clients : ${node.total_client}`,
  //     //     // Sub_clients: `Sub_clients    : ${node.total_sub_client}`,
  //     //     // Blocked_Clients: `Blocked_Clients : ${node.blocked_client}`,
  //     //     Policy:`Policy : ${node.policy}`,
  //     //     Patch:`Patch : ${node.patch}`,
  //     //     Clam: `Clam : ${node.clam}`,
  //     //   };
  //     const traverse = (node: any, parentId?: number) => {
  //       const tabSpace = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; 
  //       const tabSpace1 = '&nbsp;'; 
       
  //       const newNode: OrgChartDataNode = {
  //         id: node.unit_id,
  //         name: node.name,
  //         pid: parentId,
  //         Total_clients: `<a href="#totalClients">Total Clients${tabSpace}:${tabSpace1}${node.total_client}</a>`,
  //         Sub_clients: `<a href="#subClients">Sub-Clients${tabSpace}${tabSpace1}:${tabSpace1}${node.total_sub_client}</a>`,
  //         Blocked_Clients: `<a href="#blockedClients">Blocked Clients${tabSpace1}:${tabSpace1}${node.blocked_client}</a>`,
  //         // Policy: `<a href="#policy">Policy${tabSpace1}:${tabSpace1}${node.policy}</a>`,
  //         // Patch: `<a href="#patch">Patch${tabSpace1}${tabSpace1}:${tabSpace1}${node.patch}</a>`,
  //         // Clam: `<a href="#clam">Clam ${tabSpace1}${tabSpace1}:${tabSpace1}${node.clam}</a>`,
  //         Policy: `<div  class="dot-policy"></div>Policy${tabSpace1}:${tabSpace1}${tabSpace1}${node.policy}`,
  //         Patch: `<div  class="dot-patch"></div>Patch${tabSpace1}:${tabSpace1}${tabSpace1}${node.patch}`,
  //         Clam: `<div class="dot-clam"></div>Clam ${tabSpace1}:${tabSpace1}${tabSpace1}${node.clam}`,
        
  //       };
  //       result.push(newNode);
  
  //       if (node.children && node.children.length > 0) {
  //         for (const childNode of node.children) {
  //           traverse(childNode, node.unit_id);
  //         }
  //       }
  //     };
  
  //     for (const topLevelNode of data) {
  //       traverse(topLevelNode);
  //     }
      
  
  //     return result;
  //   } 
  
  //   zoomIn() {
  //     this.currentScale = Math.min(2, this.currentScale + 0.1);
  //     this.chart!.setScale(this.currentScale);
  //   }
  
    
  //   zoomOut() {
  //     this.currentScale = Math.max(0.5, this.currentScale - 0.1);
  //     this.chart!.setScale(this.currentScale);
  //   }
  //   }
        
    
  