import { NgModule, LOCALE_ID  } from '@angular/core';
import  localeEsMx  from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../pipe/pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { IpComponent } from '../../ip/ip.component';
import { IpFormComponent } from '../../ip-form/ip-form.component';
import { ConfReporteComponent } from '../../conf-reporte/conf-reporte.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { AuthGuardSecurity } from '../../auth/auth.guard.security';
import { ChangePwdComponent } from '../../change-pwd/change-pwd.component';
import { RptTableComponent } from '../../rpt-table/rpt-table.component';
import { RptTableIpComponent } from '../../rpt-table-ip/rpt-table-ip.component';
import { CalendarioComponent } from 'app/calendario/calendario.component';
import { RptEjecutivoIpComponent } from '../../rpt-ejecutivo-ip/rpt-ejecutivo-ip.component';
import { IpEnCampoComponent } from '../../ip-en-campo/ip-en-campo.component';


registerLocaleData(localeEsMx);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    IpComponent,
    ConfReporteComponent,
    IpFormComponent,
    LoaderComponent,
    ChangePwdComponent,
    RptTableComponent,
    RptTableIpComponent,
    CalendarioComponent,
    RptEjecutivoIpComponent,
    IpEnCampoComponent
  ],
  providers: [
    AuthGuardSecurity, 
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-MX' }

  ]
  
})

export class AdminLayoutModule {}
