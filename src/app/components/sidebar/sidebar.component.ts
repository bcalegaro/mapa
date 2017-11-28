import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'db-master', title: 'DB',  icon: 'fa fa-home', class: '' },
    { path: 'dashboard', title: 'Dashboard',  icon: 'fa-dashboard', class: '' },
    { path: 'user-profile', title: 'User Profile',  icon:'fa fa-user', class: '' },
    { path: 'table-list', title: 'Table List',  icon:'fa fa-clipboard', class: '' },
    { path: 'typography', title: 'Typography',  icon:'fa fa-book', class: '' },
    { path: 'icons', title: 'Icons',  icon:'fa fa-comment', class: '' },
    { path: 'maps', title: 'Maps',  icon:'fa fa-map-marker', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'fa fa-bell', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'fa fa-upload', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
