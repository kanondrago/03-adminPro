import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Modelo
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario?: Usuario;

  public perfilForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {

      this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    })

  }

  actualizarPerfil() {
    console.log(this.perfilForm?.value)

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( (resp:any) => {

        const { nombre, email } = this.perfilForm.value;

         console.log('resp: ',resp);
         this.usuario!.nombre = nombre
         this.usuario!.email = email
         
      } )

  }

}
