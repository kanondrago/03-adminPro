import { Component, OnInit } from '@angular/core';

// servicios
import { UsuarioService } from 'src/app/services/usuario.service';

// modelos
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuarioService.cargarUsuarios(0)
      .subscribe( ({total, usuarios}: any) => {
        // Usando desestruturación para estraer los valores
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        
        console.log('this.totalUsuarios: ', this.totalUsuarios);  
        console.log('this.usuarios: ', this.usuarios);  
        
      }, (err) => {
        console.log(err);
      })
  }

}
