import { Component } from '@angular/core';

// Services
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

// Models
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] = [];
  longitud: number= 0;
  public usuario: Usuario;

  constructor( 
    private sideBar: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = sideBar.menu;
    // console.log(this.menuItems);
    this.longitud = this.sideBar.menu[0].submenu.length;
    // console.log(this.longitud);

    this.usuario = usuarioService.usuario!;
  }
 
}
