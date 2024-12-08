import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

// rxjs
import { tap, map, catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

// Environments
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router';

// Models
import { Usuario } from '../models/usuario.model';

declare const google: any;

// http://localhost:3000/api
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) { }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    
    // Necesitamos el correo electrónico del usuario logeado
    google.accounts.id.revoke('ronaldchavezr@gmail.com', () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login'); 
      })
    })

  }

  googleSignIn(googleToken: any) {
    return this.http.post(`${base_url}/login/google`, { token: googleToken })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  tokenValidation(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((resp: any) => { // Inspecciona los datos

        console.log('Resp: ', resp);

        // Creando un usuario que es consultado a la base de datos.
        const { nombre, email, img, google, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        // const url = this.usuario.imageUrl;

        console.log('Este es el verdadero usuario: ',this.usuario);
        // console.log('getter imageUrl: ',url);

        // set del token en el localStorage
        localStorage.setItem('token', resp.token)
      }),
      map(resp => {
        return true
      }),
      catchError(error => {
        return of(false) // el operador of convierte el valor en un observable
      })
    );
  };

}
