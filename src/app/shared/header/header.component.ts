import { Component } from '@angular/core';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public imageUrl = '';

  constructor(private usuarioService: UsuarioService) {
    this.imageUrl = this.usuarioService.usuario!.imageUrl;
  }

  logout() {
    this.usuarioService.logout();
  }

}
