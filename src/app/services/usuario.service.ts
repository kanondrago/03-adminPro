import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { tap, map, catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

// Environment
import { environment } from 'src/environments/environment'

// http://localhost:3000/api
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
               .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token);
                })
               );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
               .pipe(
                tap( (resp:any) => {
                  localStorage.setItem('token', resp.token);
                } )
               );
  }

  googleSignIn(googleToken: any) {
    return this.http.post(`${base_url}/login/google`, {token: googleToken})
                .pipe(
                  tap( (resp:any) => {
                    localStorage.setItem('token', resp.token);
                  } )
                );
  }

  tokenValidation(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((resp: any) => { // Inspecciona los datos
        localStorage.setItem('token', resp.token)
      }),
      map( resp => {
        return true
      } ),
      catchError( error => {
        return of(false) // el operador of convierte el valor en un observable
      })
    );
  };

}
