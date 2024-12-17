import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'hospitales'|'medicos',
    id: string,
  ) {

    try {

      // construcción de la url necesaria
      const url = `${base_url}/upload/${tipo}/${id}`
      const formData = new FormData() // propio de javascript

      // Data que se enviará
      formData.append('imagen', archivo);

      // Almacenar la petición en el fetch
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }, 
        body: formData,
      })

      console.log('resp: ', resp);

      return 'nombre de la imagen';
      
    } catch (error) {
      console.log('Error: ',error);
      return false;
    }

  }

}
