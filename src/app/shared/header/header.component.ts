import { Component } from '@angular/core';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

// Models
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario!;
  }

  logout() {
    this.usuarioService.logout();
  }

}
