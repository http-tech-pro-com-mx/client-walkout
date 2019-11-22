import { NgModule, LOCALE_ID  } from '@angular/core';
import  localeEsMx  from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../pipe/pipe.module';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { IpComponent } from '../../ip/ip.component';
import { IpFormComponent } from '../../ip-form/ip-form.component';
import { ConfReporteComponent } from '../../conf-reporte/conf-reporte.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

registerLocaleData(localeEsMx);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    PipeModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    IpComponent,
    ConfReporteComponent,
    IpFormComponent,
    LoaderComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-MX' }

  ]
  
})

export class AdminLayoutModule {}
