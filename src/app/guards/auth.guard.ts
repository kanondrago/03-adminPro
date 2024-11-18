import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs'; // Importar Observable
import { tap, map } from 'rxjs/operators'

// Servicios
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService  
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.usuarioService.tokenValidation()
               .pipe(
                tap(isAuth => {
                  if(!isAuth) {
                    this.router.navigateByUrl('/login');
                  }
                })
               );
  }
}