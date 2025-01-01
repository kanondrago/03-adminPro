import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

// Modelo
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario!: Usuario;
  public perfilForm!: FormGroup;
  public imagenSubir!: File;
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {

      this.usuario = usuarioService.usuario!;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    })

  }

  actualizarPerfil() {
    console.log('actualizar Perfil: ',this.perfilForm?.value)

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( (resp:any) => {

        const { nombre, email } = this.perfilForm.value;

         console.log('resp: ',resp);
         this.usuario!.nombre = nombre
         this.usuario!.email = email
         
      } )

  }

  cambiarImagen(event: any) {
    const file:File = event.target.files[0];
    this.imagenSubir = file;
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
      })
  }

}
