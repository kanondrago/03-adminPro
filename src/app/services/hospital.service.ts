import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  // El tipo de variable se envia, de esta manera queda definida en la raíz
  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http.get<any>(url, this.headers)
              .pipe(
                map((resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales)
              )
  }

  crearHospital(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post<any>(url, { nombre }, this.headers)
                  .pipe(
                    map((resp: any) => resp.hospital)
                  );
  }

  actualizarHospital(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put<any>(url, { nombre }, this.headers)
                  .pipe(
                    map((resp: any) => resp.hospital)
                  );
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }



}
