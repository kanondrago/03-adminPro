import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// sweetAlert2 ==> para las alertas dinámicas
import Swal from 'sweetalert2'; 

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

// Tipado
import { LoginForm } from '../../interfaces/login-form.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{

  public loginForm = this.fb.group({
    email: [ '', [ Validators.required ,Validators.email ] ],
    password: [ '', [ Validators.required ] ],
    remember: [ false ],
  })

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {
    
  }

  login() {

    console.log('Formulario: ', this.loginForm.value)
    // this.router.navigateByUrl('/');

    this.usuarioService.login(this.loginForm.value as LoginForm)
      .subscribe( resp => {
        console.log('respuesta login: ',resp);
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error'); // El ultimo es un ícono.
      })




  }

}
