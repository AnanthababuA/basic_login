import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgForOf } from '@angular/common';

// card 1
interface topcards {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
}


// card 2
interface cardimgs {
  id: number;
  time: string;
  imgSrc: string;
  user: string;
  title: string;
  views: string;
  category: string;
  comments: number;
  date: string;
}


@Component({
  selector: 'app-client-administraion',
  templateUrl: './client-administraion.component.html',
  styleUrls: ['./client-administraion.component.scss']
})
export class ClientAdministraionComponent {

  topcards: topcards[] = [
    {
      id: 1,
      color: 'primary',
      icon: 'account_circle',
      title: '386',
      subtitle: 'New Clients',
    },
    {
      id: 2,
      color: 'warning',
      icon: 'local_mall',
      title: '2,408',
      subtitle: 'All Projects',
    },
    {
      id: 3,
      color: 'accent',
      icon: 'stars',
      title: '352',
      subtitle: 'New Items',
    },
    {
      id: 4,
      color: 'error',
      icon: 'content_paste',
      title: '159',
      subtitle: 'New Invoices',
    },
  ];

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  dummyData: any[] = [];


  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'lBfrtip',
    buttons: [
      'copy', 'excel', 'pdf','pdfHtml5'
  ],

    };

    for (let i = 1; i <= 20; i++) {
      this.dummyData.push({
        id: i,
        firstName: `First Name ${i}`,
        lastName: `Last Name ${i}`,
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the dtTrigger when the component is destroyed
    this.dtTrigger.unsubscribe();
  }

  
  //   card 2
  cardimgs: cardimgs[] = [
    {
      id: 1,
      time: '2 mins Read',
      imgSrc: '/assets/images/blog/blog-img1.jpg',
      user: '/assets/images/profile/user-1.jpg',
      title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
      views: '9,125',
      category: 'Social',
      comments: 3,
      date: 'Mon, Dec 23',
    },
    {
      id: 2,
      time: '2 mins Read',
      imgSrc: '/assets/images/blog/blog-img2.jpg',
      user: '/assets/images/profile/user-2.jpg',
      title:
        'Intel loses bid to revive antitrust case against patent foe Fortress',
      views: '9,125',
      category: 'Gadget',
      comments: 3,
      date: 'Sun, Dec 23',
    },
    {
      id: 3,
      time: '2 mins Read',
      imgSrc: '/assets/images/blog/blog-img3.jpg',
      user: '/assets/images/profile/user-3.jpg',
      title: 'COVID outbreak deepens as more lockdowns loom in China',
      views: '9,125',
      category: 'Health',
      comments: 12,
      date: 'Sat, Dec 23',
    },
  ];


}
