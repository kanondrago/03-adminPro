import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo?: 'usuarios' | 'medicos' | 'hospitales';
  public id?: string;
  public img?: string;

  // Es un observable --> te puedes suscribir a el donde quieras
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>()


  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id?: string,
    img: string = 'no-img', // no-img significa que no existe imagen
  ){
    this._ocultarModal = false;
    this.tipo = tipo
    this.id = id
    this.img = img

    if(img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }



}
