import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { IpComponent } from '../../ip/ip.component';
import { IpFormComponent } from '../../ip-form/ip-form.component';
import { ConfReporteComponent } from '../../conf-reporte/conf-reporte.component';
import { AuthGuardSecurity } from '../../auth/auth.guard.security';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'ip', component: IpComponent, canActivate: [AuthGuardSecurity],  data: { expectedRole: 'HQ' } },
    { path: 'ip/editar/:id_ip', component: IpFormComponent, canActivate: [AuthGuardSecurity],  data: { expectedRole: 'HQ' } },
    { path: 'ip/crear/:id_proyecto', component: IpFormComponent, canActivate: [AuthGuardSecurity],  data: { expectedRole: 'HQ' } },
    { path: 'configuracion', component: ConfReporteComponent , canActivate: [AuthGuardSecurity],  data: { expectedRole: 'HQ' }}
];
