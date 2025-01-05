import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

// rxjs
import { tap, map, catchError, delay } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

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

  
get token(): string {
  return localStorage.getItem('token') || '';
}

get uid(): string {
  return this.usuario?.uid || '';
}

get headers() {
  return {
    headers: {
      'x-token': this.token,
    }
  }
}

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data : { nombre: string, email: string, role: any }) {

    data = {
      ...data,
      role: this.usuario!.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: { 'x-token': this.token }
    });
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
    
    // console.log('this.usuario?.google : ', this.usuario?.google);

    if(this.usuario?.google) {
      // Inicializamos el usuario de google para cerrar sesión
      this.googleInit();
      // Necesitamos el correo electrónico del usuario logeado
      google.accounts.id.revoke(this.usuario!.email, () => {
        this.ngZone.run( () => {
          this.router.navigateByUrl('/login'); 
        })
      })
    } else {
      this.router.navigateByUrl('/login'); 
    }
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "846676967535-rt8qj61da6qjnh4lkk3nilhkqrle0pk7.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response) // Tener cuidado con los this de esto callbacks
    });
  }

  handleCredentialResponse(response: any) {

    const googleToken = response.credential;

    this.googleSignIn(googleToken)
      .subscribe(resp => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      }, err => {
        console.log('Error en el Google Sign In', err);
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

    return this.http.get(`${base_url}/login/renew`, {
      headers: { 'x-token': this.token }
    }).pipe(
      map((resp: any) => { // Inspecciona los datos

        console.log('Resp: ', resp);

        // Creando un usuario que es consultado a la base de datos.
        const { nombre, email, img, google, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        // const url = this.usuario.imageUrl;

        console.log('Este es el verdadero usuario: ',this.usuario);
        // console.log('getter imageUrl: ',url);

        // set del token en el localStorage
        localStorage.setItem('token', resp.token);

        return true;
      }),
      catchError(error => {
        return of(false) // el operador of convierte el valor en un observable
      })
    );
  };

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(
        // delay(5000), // Solo para verificar si el loading estaba funcionando
        map( resp => {
          console.log('***resp: ', resp);
          const usuarios = resp.usuarios.map( user => {
            return new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid);
          })

          return {
            total: resp.total,
            usuarios: usuarios
          }
        })
      )
  }

  eliminarUsuario(id: string | undefined) {
    const url = `${base_url}/usuarios/${id}`
    return this.http.delete(url, this.headers);
  }


}
