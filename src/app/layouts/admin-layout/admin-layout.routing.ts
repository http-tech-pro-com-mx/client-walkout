import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { IpComponent } from '../../ip/ip.component';
import { IpFormComponent } from '../../ip-form/ip-form.component';
import { ConfReporteComponent } from '../../conf-reporte/conf-reporte.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'ip', component: IpComponent },
    { path: 'ip/detalle/:id', component: IpFormComponent },
    { path: 'ip/detalle/:id/:id_proyecto', component: IpFormComponent },
    { path: 'configuracion', component: ConfReporteComponent }
];
