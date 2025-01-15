import { Component, OnInit } from '@angular/core';

// servicios
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

// interfaces
import { CargarUsuarios } from 'src/app/interfaces/cargar-usuarios.interface';

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
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public pagina: number = 1;

  constructor(
      private usuarioService: UsuarioService,
      private busquedasService: BusquedasService) {

  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total, usuarios}: CargarUsuarios) => {
      // Usando desestruturación para estraer los valores
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios; // Almacenando de manera temporal
      this.cargando = false;
      
    }, (err) => {
      console.log(err);
    })
  }


  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0 ) {
      this.desde = 0;
    } else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;  
    }

    // Me lleva a la página actual
    this.pagina = (this.desde+5)/5

    // carga los usuarios
    this.cargarUsuarios();
  }

  eliminarUsuario(uid: string | undefined) {
    // console.log('El id es: ', uid);

    this.usuarioService.eliminarUsuario(uid)
      .subscribe( resp => {
        console.log(resp);
        this.usuarios = this.usuarios.filter(usuario => usuario.uid !== uid);
      }, (err) => {
        console.log(err);
      })

  }

  buscar(termino: any): any {

    if(termino.length === 0) {
      return this.usuarios = this.usuariosTemp; // se retorna el usuario temporal
    }

    // console.log(termino);
    this.busquedasService.buscar('usuarios', termino)
      .subscribe((resultados: any) => {
        this.usuarios = resultados;
      })
  }

}
