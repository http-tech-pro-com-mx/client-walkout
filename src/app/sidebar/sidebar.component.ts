import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare var toastr:any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'Perfil',  icon:'pe-7s-user', class: '' },
    { path: '/ip', title: 'IP',  icon:'pe-7s-folder', class: '' },
    { path: '/ip/crear', title: 'Detalle IP',  icon:'pe-7s-folder', class: '' },
    { path: '/configuracion', title: 'Configuracion',  icon:'pe-7s-settings', class: '' }
];

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem =>{ 
        if(menuItem.path != '/ip/crear' && menuItem.path != '/ip/editar'){
            return menuItem;
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
