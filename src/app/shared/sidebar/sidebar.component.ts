import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] = [];
  longitud: number= 0;

  constructor( private sideBar: SidebarService) {
    this.menuItems = sideBar.menu;
    console.log(this.menuItems);
    this.longitud = this.sideBar.menu[0].submenu.length;
    console.log(this.longitud);
  }
 
}
