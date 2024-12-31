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

      // propio de javascript --> para preparar data, para enviar información al backend
      const formData = new FormData() 

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

      // desencapsular la resp
      const data = await resp.json()

      console.log('data: ', data);

      return 'nombre de la imagen';
      
    } catch (error) {
      console.log('Error: ',error);
      return false;
    }

  }

}
