import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

  eliminarUsuario(usuario: Usuario) {

    if(usuario.uid === this.usuarioService.uid){
      Swal.fire('No puede borrar este usuario', 'error');
      return 
    } 
    
    // SweetAlert
    Swal.fire({
      title: "¿ Borrar usuario ?",
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.uid)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire({
              title: "Deleted!",
              text: `${resp.msg}`,
              icon: "success"
            });
            this.cargarUsuarios();
        })
      }
    });
  }

  buscar(termino: string): any {

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
