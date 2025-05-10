import { Component } from '@angular/core';

// Services
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) {

  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: any) {
    const file:File = event.target.files[0];
    this.imagenSubir = file;

    if(!file)  {
      this.imgTemp = null;
      return
    };

    const reader = new FileReader(); // propio de javascript
    reader.readAsDataURL(file);

    // Cargando la imagen a modo string base 64
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {

    let id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo!, id!)
      .then(img => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        
        // Emitiendo el img
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch((err) => {
        Swal.fire('Error', 'Ocurrio un error al subir la imagen', 'error');
      })
  }

}
