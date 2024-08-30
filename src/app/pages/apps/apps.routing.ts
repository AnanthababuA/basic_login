import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventslistComponent } from './eventslist/eventslist.component';
import { SchedulerformComponent } from './schedulerform/schedulerform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyFormsComponent } from './survey-forms/survey-forms.component';
import { OnlineMeetComponent } from './online-meet/online-meet.component';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
          urls: [
            { title: 'Home', url: '/apps/home' },
            { title: 'Home' },
          ],
        },
      },

      {
        path: 'events',
        component: EventslistComponent,
        data: {
          title: 'Event',
          urls: [
            { title: 'Home', url: '/apps/events' },
            { title: 'Event' },
          ],
        },
      },

      {
        path: 'schedulerform',
        component: SchedulerformComponent,
        data: {
          title: 'schedulerform',
          urls: [
            { title: 'schedulerform', url: '/apps/schedulerform' },
            { title: 'schedulerform' },
          ],
        },
      },

      {
        path: 'Dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          urls: [
            { title: 'Dashboard', url: '/apps/Dashboard' },
            { title: 'Dashboard' },
          ],
        },
      },

      {
        path: 'survey',
        component: SurveyFormsComponent,
        data: {
          title: 'survey',
          urls: [
            { title: 'survey', url: '/apps/survey' },
            { title: 'survey' },
          ],
        },
      },

      {
        path: 'online-meet',
        component: OnlineMeetComponent,
        data: {
          title: 'online-meet',
          urls: [
            { title: 'online-meet', url: '/apps/online-meet' },
            { title: 'online-meet' },
          ],
        },
      },

      // {
      //   path: 'groups',
      //   component: GroupsComponent,
      //   data: {
      //     title: 'Groups',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboards/dashboard1' },
      //       { title: 'Groups' },
      //     ],
      //   },
      // },
      
      
    ],
  },
];
