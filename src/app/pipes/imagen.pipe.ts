import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, tipo: 'usuarios'|'hospitales'|'medicos'): string {

    if(!img) {
      return `${base_url}/upload/usuarios/no-image` 
    } else if(img?.includes('https')) {
        return img;
    } else if(img) {
        return `${base_url}/upload/${tipo}/${img}`
    } else {
        return `${base_url}/upload/usuarios/no-image`
    }



  
  }


}
