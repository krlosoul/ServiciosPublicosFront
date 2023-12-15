import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { RolesEnum } from 'src/app/enums/roles.enum';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'reports', title: 'Reportes',  icon:'ni ni-chart-bar-32', class: '' },
  { path: 'viewreports', title: 'Ver reportes',  icon:'ni ni-paper-diploma', class: '' }
];

export const MENU_ITEMS: any[] = [
  {
    title: 'Reportes',
    icon: 'ni ni-chart-pie-35 text-green',
    submenus: [
      { path: 'reports', title: 'Reportes', icon: 'ni ni-chart-bar-32', class: '', expectedRole:  [RolesEnum.Administrator,RolesEnum.Editor] },
      { path: 'viewreports', title: 'Ver reportes', icon: 'ni ni-paper-diploma', class: '', expectedRole:  [RolesEnum.Viewer] },
    ],
    expectedRole: [RolesEnum.Administrator,RolesEnum.Editor,RolesEnum.Viewer]
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public activeIndex: number;
  public userRole: string;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.userRole = this.storageService.getRole();
    this.menuItems = MENU_ITEMS.map(mainItem => {
      const submenus = mainItem.submenus
        ? mainItem.submenus.filter(subItem => subItem.expectedRole.includes(this.userRole))
        : [];
    
      if (mainItem.expectedRole.includes(this.userRole) || submenus.length > 0) {
        return {
          ...mainItem,
          submenus: submenus,
          isOpen: false,
        };
      }
      return null;
    }).filter(item => item !== null);
  
    this.activeIndex = -1;
  }

  toggleMenu(index: number) {
    if (this.activeIndex === index) {
      this.menuItems[index].isOpen = !this.menuItems[index].isOpen;
    } else {
      this.closeActiveMenu();
      this.menuItems[index].isOpen = true;
      this.activeIndex = index;
    }
  }

  closeActiveMenu() {
    if (this.activeIndex !== -1) {
      this.menuItems[this.activeIndex].isOpen = false;
    }
  }
}
