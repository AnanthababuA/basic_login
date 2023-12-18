// import { Component } from '@angular/core';
// import { Component, ViewEncapsulation } from '@angular/core';
import { Component, ViewEncapsulation, Renderer2, ElementRef, ViewChild } from '@angular/core';
// import { TreeNode } from 'primeng/api';
import { CommonServicesService } from 'src/app/services/common-services.service';

// interface MyTreeNode extends TreeNode {
//     unit_id: number;
//     name: string;
//     type: string;
//     styleClass: string;
//   }

@Component({
  selector: 'app-hierarchy-chart',
  templateUrl: './hierarchy-chart.component.html',
  styleUrls: ['./hierarchy-chart.component.scss'],
  encapsulation:ViewEncapsulation.None         
})
export class HierarchyChartComponent {
  @ViewChild('orgChart', { static: true }) orgChart: ElementRef;

  //   organizationData: TreeNode;
  zoomLevel = 1; // Initial zoom level
  
  // organizationData: MyTreeNode[];
  
  
    constructor(private renderer: Renderer2,private common: CommonServicesService){
    }
  
    ngOnInit() {
      // this.common.hierarchy().subscribe((res) => {
    
      //   console.log("res",res)
      //     const jsonData: TreeNode = res;
      //     this.organizationData = this.modifyDataStructure(jsonData.data) as MyTreeNode[];
      //     console.log('Organization Data:', this.organizationData);
      // });
    }
  
    
    zoomIn() {
      this.zoomLevel += 0.1; // Increase the zoom level
    }
    
    zoomOut() {
      if (this.zoomLevel > 0.1) {
        this.zoomLevel -= 0.1; // Decrease the zoom level, but not below 0.1
      }
    }

    modifyDataStructure(data: any[], level: number = 0): any[] {
      return data.map(node => {
        const modifiedNode: any = {
          expanded: false,
          type: 'person',
          styleClass: this.getStyleClass(level),
          data: {
            name: node.name,
          },
          children: node.children ? this.modifyDataStructure(node.children, level + 1) : [],
        };
    
        return modifiedNode;
      });
    }

    
    private getStyleClass(level: number): string {
      // Define your style classes based on the level
      const styleClasses = ['level-0', 'level-1', 'level-2', 'level-3'];
      const index = level % styleClasses.length; 
    
      return styleClasses[index];
    }
   
    highlightOnMouseOver(node: any) {
      // Add the 'node-highlight' class on mouseover
      node.highlighted = true;
    }
  
    removeHighlightOnMouseOut(node: any) {
      // Remove the 'node-highlight' class on mouseout
      node.highlighted = false;
    }
  
    ngAfterViewInit() {
      // Access the p-organizationChart element and attach a click event listener
      const orgChartElement = this.orgChart.nativeElement;
  
      if (orgChartElement) {
        this.renderer.listen(orgChartElement, 'click', (event) => {
          this.handleNodeClick(event);
        });
      }
    }

    // ngAfterViewInit() {
    //   // Access the p-organizationChart element and attach a click event listener
    //   if (this.orgChart) {
    //     const orgChartElement = this.orgChart.nativeElement;
  
    //     this.renderer.listen(orgChartElement, 'click', (event) => {
    //       this.handleNodeClick(event);
    //     });
    //   }
    // }


      highlightNode(node: any) {
          // Reset the 'highlighted' property for all nodes
          // this.organizationData.forEach((n: any) => n.highlighted = false);
          // Highlight the clicked node
          node.highlighted = true;
      }   
      // calculateMinWidth(node: MyTreeNode): string {
      //     // Set a base width
      //     let minWidth = '250px';
      
      //     // Adjust the width if the node is expanded
      //     if (node.expanded) {
      //       minWidth = '100px'; // Set your desired expanded width
      //     }
      
      //     return minWidth;
      //   }
    handleNodeClick(event: any) {
      // Remove the 'node-highlight' class from all nodes
      const nodes = document.querySelectorAll('.node-style');
      nodes.forEach((element: any) => {
        this.renderer.removeClass(element, 'node-highlight');
      });
  
      // Add the 'node-highlight' class to the clicked node
      const clickedNode = event.target.closest('.node-style');
      if (clickedNode) {
        this.renderer.addClass(clickedNode, 'node-highlight');
      }
    }
    
  }
      
  