import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

declare const $: any;
declare var toastr: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: Array<string>
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '', roles: ['ROLE_ADMIN', 'ROLE_WALKER' , 'ROLE_HQ'] },
  { path: '/user', title: 'Perfil', icon: 'pe-7s-user', class: '', roles: ['ROLE_ADMIN', 'ROLE_WALKER' , 'ROLE_HQ'] },
  { path: '/security/pwd', title: 'Contraseña', icon: 'pe-7s-key', class: '', roles: ['ROLE_CHANGE_PWD'] },
  { path: '/ip', title: 'IP', icon: 'pe-7s-folder', class: '', roles: ['ROLE_HQ', 'ROLE_ADMIN'] },
  { path: '/ip/crear', title: 'Detalle IP', icon: 'pe-7s-folder', class: '', roles: ['ROLE_HQ'] },
  { path: '/configuracion', title: 'Configuracion', icon: 'pe-7s-settings', class: '', roles: ['ROLE_HQ'] }
];

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {

    this.menuItems = ROUTES.filter(menuItem => {
     
    });

    // filtra menu basado en roles
    this.menuItems = ROUTES.filter(menuItem => {

      let hasPermiso = false;

      for (let index = 0; index < menuItem.roles.length ; index++) {

        if (this.auth.hasPermission(menuItem.roles[index])){
          hasPermiso = true;
          break;
        }
         
      }

      if(hasPermiso){

        if (menuItem.path != '/ip/crear' && menuItem.path != '/ip/editar') {
          return menuItem;
        }

      }

    });

  }


  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout(event) {

    try {
      if (localStorage.data_user) {
        localStorage.removeItem('data_user');
      }
    } catch (e) { }

    try {
      if (localStorage.t0k3N34lkoutl) {
        localStorage.removeItem('t0k3N34lkoutl');
      }
    } catch (e) {
      toastr.error('No se pudo cerrar sesión!');
    }
    this.router.navigate(['login']);
    event.preventDefault();
  }

}
