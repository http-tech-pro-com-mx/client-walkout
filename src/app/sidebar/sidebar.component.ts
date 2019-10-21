import { Component, OnInit } from '@angular/core';

declare const $: any;
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
    { path: '/ip/detalle', title: 'Detalle IP',  icon:'pe-7s-folder', class: '' },
    { path: '/configuracion', title: 'Configuracion',  icon:'pe-7s-settings', class: '' }
];

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem =>{ 
        if(menuItem.path != '/ip/detalle'){
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
}
