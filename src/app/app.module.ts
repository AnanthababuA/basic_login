import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPipe } from './pipe/filter.pipe';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
// import { DataTablesModule } from "angular-datatables";
import { DataTablesModule } from "angular-datatables";
import { NgxSpinnerModule } from 'ngx-spinner';

import { OrganizationChartModule } from 'primeng/organizationchart';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,NgxSpinnerModule,
    TablerIconsModule.pick(TablerIcons),
    NgApexchartsModule,
    TablerIconsModule,
    OrganizationChartModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TablerIconsModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
      // useClass: PathLocationStrategy
    },
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
