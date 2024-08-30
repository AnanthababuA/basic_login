import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatIconModule} from '@angular/material/icon';
import { DataTablesModule } from "angular-datatables";
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from 'mat-timepicker';
import { HomeComponent } from './home/home.component';
import { EventslistComponent } from './eventslist/eventslist.component';
import { SchedulerformComponent } from './schedulerform/schedulerform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyFormsComponent } from './survey-forms/survey-forms.component';
import { OnlineExamComponent } from './online-exam/online-exam.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,DataTablesModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,NgxSpinnerModule,MatDatepickerModule,
    MatNativeDateModule,
    NgScrollbarModule,MatIconModule,
    NgxMatSelectSearchModule,MatSelectModule, MatTimepickerModule, NgSelectModule,
    // NgxSurveyModule,
  ],
  exports: [TablerIconsModule],
  declarations: [  
    HomeComponent, EventslistComponent, SchedulerformComponent, DashboardComponent, SurveyFormsComponent, OnlineExamComponent
  ],
  providers: [DatePipe],
})
export class AppsModule {}
