import {
  Component,
  Input,
  ViewChild,
  ElementRef,
Renderer2,
  
} from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hierarchy-chart',
  templateUrl: './hierarchy-chart.component.html',
  styleUrls: ['./hierarchy-chart.component.scss'],
})
export class HierarchyChartComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @Input() data: any;
  chart: any;
  private currentScale =0.7;
    data1: any;
 onResize(event: Event) {
    this.updateChart();
  }

  constructor(private el: ElementRef,private common: CommonServicesService,   private spinner: NgxSpinnerService
    ) {}
  ngOnInit(){

    this.common.hierarchy().subscribe((res) => {
        this.spinner.show();
        if (res.api_status === true) {
            this.spinner.hide();
            this.data1=res.data
            this.data = this.chartdata(this.data1);
            this.updateChart()
        }
        else {
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: `${res.message}`,
            });
          }
        }, error => {
          this.spinner.hide();
          console.log("Error: ", error);
        });
      
}
chartdata(node: any[], parentNodeId: string | null = null): any[] {
  const flatData: any[] = [];

  node.forEach((node, index) => {
    const nodeId = `O-${node.unit_id}-${index + 1}`;
    const flatNode = {
    nodeId,
    parentNodeId,
    unit_id: node.unit_id,
    name: node.name,  
    total_client:node.total_client,
    blocked_client:node.blocked_client,
    clam:node.clam,
    patch:node.patch,
    policy:node.policy,
    };

    flatData.push(flatNode);

    if (node.children) {
      const childNodes = this.chartdata(node.children, nodeId);
      flatData.push(...childNodes);
      
    }
  });

  return flatData;
}

  ngAfterViewInit() {
    this.initializeChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
 
  initializeChart() {
    if (!this.chart) {
      this.chart = new OrgChart().compact(false);
    }
    
    this.updateChart();
  }

updateChart() {
    if (!this.data || !this.chart) {
      return;
    }
    
    this.chart.clear();
        
    this.chart.data(this.data);
    this.chart.container(this.chartContainer.nativeElement);
    this.chart.initialZoom(1);
    this.chart.initialExpandLevel(0);
    this.chart.nodeContent((data: any) => {
    const nodeName = data.data?.name;
    const totalClients = data.data?.total_client || 0;
    const blockedClients = data.data?.blocked_client || 0;
    const policy = data.data?.policy || 0;
    const patch = data.data?.patch || 0;
    const clam = data.data?.clam || 0;

    const bodyContent = `
    <div style="color: blue; font-weight: bold; font-size: 12px; margin-bottom: 4px; margin-left: 30px;">
    <a href="">Total clients
    <div style="display: inline-block; margin-left: 37px;">: ${totalClients}</div></a>
  </div>    

  <div style="color: blue; font-weight: bold; font-size: 12px; margin-bottom: 4px; margin-left: 30px;line-height: 1.5;">
    <a href="">Blocked Clients
    <div style="display: inline-block; margin-left: 16px;">: ${blockedClients}</div></a>
  </div>  
      <div style="color: #7a0220; font-weight: bold; font-size: 12px; margin-bottom: 4px;line-height: 1.5;"> 
        <div style="display: flex; align-items: center;margin-left: 45px;">
          <div style="background-color: #EB455F; width: 1em; height: 1em; border-radius: 50%; margin-right: 1em;"></div>
          Policy  <div style="margin-left: 16px;">: ${policy} </div>
        </div>
      </div>
      <div style="color: #7a0220; font-weight: bold; font-size: 12px; margin-bottom: 4px;line-height: 1.5;"> 
        <div style="display: flex; align-items: center; margin-left: 45px;">
          <div style="background-color: #96C291; width: 1em; height: 1em; border-radius: 50%; margin-right: 1em;"></div>
          Patch  <div style="margin-left: 18px;">: ${patch} </div>
        </div>
      </div> 
      <div style="color: #7a0220; font-weight: bold; font-size: 12px; margin-bottom: 4px;"> 
        <div style="display: flex; align-items: center; margin-left: 45px;">
          <div style="background-color: #EB455F; width: 1em; height: 1em; border-radius: 50%; margin-right: 1em;"line-height: 1.5;></div>
          Clam  <div style="margin-left: 22px;">: ${clam} </div>
        </div>
      </div>
    `;
  
    const styledNode = `
      <div style="border: 1px solid black; border-radius: 8px; background-color: #5FBDFF;  overflow: hidden;  margin-left: 27px; ">
        <div style="background-color: #5FBDFF; color: white; padding: 5px; font-size: 1.2em; font-weight: bold; text-align: center;">${nodeName}</div>
        <div style="padding: 11px;  background-color: white;">${bodyContent}</div>
      </div>
    `;
  
    return styledNode;
  });this.chart.render();
    

  }

  zoomIn() {
    if (this.chart) {
      this.chart.zoomIn();
    }
  }

  zoomOut() {
    if (this.chart) {
      this.chart.zoomOut();
    }
  }
 
}



