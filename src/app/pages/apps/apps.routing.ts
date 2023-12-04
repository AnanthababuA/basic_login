import { Routes } from '@angular/router';

// import { AppChatComponent } from './chat/chat.component';
// import { AppNotesComponent } from './notes/notes.component';
// import { AppTodoComponent } from './todo/todo.component';
// import { AppPermissionComponent } from './permission/permission.component';
// import { AppEmailComponent } from './email/email.component';
// import { DetailComponent } from './email/detail/detail.component';
// import { AppTaskboardComponent } from './taskboard/taskboard.component';
// import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
// import { AppTicketlistComponent } from './ticketlist/ticketlist.component';
// import { AppContactComponent } from './contact/contact.component';
// import { AppCoursesComponent } from './courses/courses.component';
// import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';
// import { AppEmployeeComponent } from './employee/employee.component';
// import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
// import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
// import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
// import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
// import { AppBlogsComponent } from './blogs/blogs.component';
// import { AppBlogDetailsComponent } from './blogs/details/details.component';
import { GenerateotpComponent } from './generateotp/generateotp.component';
import { ManageunitComponent } from './manageunit/manageunit.component';
import { LocaladminComponent } from './localadmin/localadmin.component';
import { ClientAdministraionComponent } from './client-administraion/client-administraion.component';
import { PolicyConfigurationComponent } from './policy-configuration/policy-configuration.component';
import { ListregclientComponent } from './listregclient/listregclient.component';
import { RegstatusclientComponent } from './regstatusclient/regstatusclient.component';
import { GroupsComponent } from './groups/groups.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { HierarchyChartComponent } from './hierarchy-chart/hierarchy-chart.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'generateotp',
        component: GenerateotpComponent,
        data: {
          title: 'Generate OTP',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'generateotp' },
          ],
        },
      },

 {
        path: 'manageunit',
        component: ManageunitComponent,
        data: {
          title: 'Manage Unit',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Unit' },
          ],
        },
      },
      {
        path: 'localadmin',
        component: LocaladminComponent,
        data: {
          title: 'Local Admin',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Local Admin' },
          ],
        },
      },

      {
        path: 'policyConfiguration',
        component: PolicyConfigurationComponent,
        data: {
          title: 'Manage Policy',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Policy Configuration' },
          ],
        },
      },

      {
        path: 'groups',
        component: GroupsComponent,
        data: {
          title: 'Groups',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Groups' },
          ],
        },
      },
      
      {
        path: 'logViewer',
        component: LogViewerComponent,
        data: {
          title: 'Log Viewer',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Log Viewer' },
          ],
        },
      },
      {
        path: 'hierarchyChart',
        component: HierarchyChartComponent,
        data: {
          title: 'HierarchyvChart',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'HierarchyvChart' },
          ],
        },
      },
      // {
      //   path: 'notes',
      //   component: AppNotesComponent,
      //   data: {
      //     title: 'Notes',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Notes' },
      //     ],
      //   },
      // },
      { path: 'email', redirectTo: 'email/inbox', pathMatch: 'full' },
      { path: 'listregclient', component: ListregclientComponent }, 
  {path:'statusregclients',component:RegstatusclientComponent},
      // {
      //   path: 'email/:type',
      //   component: AppEmailComponent,
      //   data: {
      //     title: 'Email',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Email' },
      //     ],
      //   },
      //   children: [
      //     {
      //       path: ':id',
      //       component: DetailComponent,
      //       data: {
      //         title: 'Email Detail',
      //         urls: [
      //           { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //           { title: 'Email Detail' },
      //         ],
      //       },
      //     },
      //   ],
      // },
      // {
      //   path: 'permission',
      //   component: AppPermissionComponent,
      //   data: {
      //     title: 'Roll Base Access',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Roll Base Access' },
      //     ],
      //   },
      // },
      // {
      //   path: 'todo',
      //   component: AppTodoComponent,
      //   data: {
      //     title: 'Todo App',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Todo App' },
      //     ],
      //   },
      // },
      // {
      //   path: 'taskboard',
      //   component: AppTaskboardComponent,
      //   data: {
      //     title: 'Taskboard',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Taskboard' },
      //     ],
      //   },
      // },
      // {
      //   path: 'tickets',
      //   component: AppTicketlistComponent,
      //   data: {
      //     title: 'Tickets',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Tickets' },
      //     ],
      //   },
      // },
      // {
      //   path: 'contacts',
      //   component: AppContactComponent,
      //   data: {
      //     title: 'Contacts',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Contacts' },
      //     ],
      //   },
      // },
      // {
      //   path: 'courses',
      //   component: AppCoursesComponent,
      //   data: {
      //     title: 'Courses',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Courses' },
      //     ],
      //   },
      // },
      // {
      //   path: 'courses/coursesdetail/:id',
      //   component: AppCourseDetailComponent,
      //   data: {
      //     title: 'Course Detail',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Course Detail' },
      //     ],
      //   },
      // },
      // {
      //   path: 'blog/post',
      //   component: AppBlogsComponent,
      //   data: {
      //     title: 'Posts',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Posts' },
      //     ],
      //   },
      // },
      // {
      //   path: 'blog/detail/:id',
      //   component: AppBlogDetailsComponent,
      //   data: {
      //     title: 'Blog Detail',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Blog Detail' },
      //     ],
      //   },
      // },
      // {
      //   path: 'employee',
      //   component: AppEmployeeComponent,
      //   data: {
      //     title: 'Employee',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Employee' },
      //     ],
      //   },
      // },
      // {
      //   path: 'invoice',
      //   component: AppInvoiceListComponent,
      //   data: {
      //     title: 'Invoice',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Invoice' },
      //     ],
      //   },
      // },
      {
        path: 'clientAdministration',
        component: ClientAdministraionComponent,
        data: {
          title: 'Manage Client',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'clientAdministration' },
          ],
        },
      },
      // {
      //   path: 'addInvoice',
      //   component: AppAddInvoiceComponent,
      //   data: {
      //     title: 'Add Invoice',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Add Invoice' },
      //     ],
      //   },
      // },
      // {
      //   path: 'viewInvoice/:id',
      //   component: AppInvoiceViewComponent,
      //   data: {
      //     title: 'View Invoice',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'View Invoice' },
      //     ],
      //   },
      // },
      // {
      //   path: 'editinvoice/:id',
      //   component: AppEditInvoiceComponent,
      //   data: {
      //     title: 'Edit Invoice',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Edit Invoice' },
      //     ],
      //   },
      // },
    ],
  },
];
