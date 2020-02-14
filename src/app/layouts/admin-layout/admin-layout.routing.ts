import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { IpComponent } from '../../ip/ip.component';
import { IpFormComponent } from '../../ip-form/ip-form.component';
import { ConfReporteComponent } from '../../conf-reporte/conf-reporte.component';
import { AuthGuardSecurity } from '../../auth/auth.guard.security';
import { ChangePwdComponent } from '../../change-pwd/change-pwd.component';
import { RptEjecutivoIpComponent } from 'app/rpt-ejecutivo-ip/rpt-ejecutivo-ip.component';
import { IpEnCampoComponent } from '../../ip-en-campo/ip-en-campo.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'ip', component: IpComponent, canActivate: [AuthGuardSecurity],  data: { expectedRole: 'ROLE_CONSULTA_IP' } },
    { path: 'ip/editar/:id_ip', component: IpFormComponent, canActivate: [AuthGuardSecurity],  data: { expectedRole: 'ROLE_HQ' } },
    { path: 'ip/crear/:id_proyecto', component: IpFormComponent, canActivate: [AuthGuardSecurity],  data: { expectedRole: 'ROLE_HQ' } },
    { path: 'ips/en-campo', component: IpEnCampoComponent  },
    { path: 'reporte-ip', component: RptEjecutivoIpComponent  },
    { path: 'configuracion', component: ConfReporteComponent , canActivate: [AuthGuardSecurity],  data: { expectedRole: 'ROLE_HQ' }},
    { path: 'security/pwd', component: ChangePwdComponent , canActivate: [AuthGuardSecurity],  data: { expectedRole: 'ROLE_CHANGE_PWD' }},
];
