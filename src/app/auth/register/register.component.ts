import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// sweetAlert2 ==> para las alertas dinámicas
import Swal from 'sweetalert2'; 

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3) ]],
    email: [ '', [ Validators.required ,Validators.email ] ],
    password: [ '', [ Validators.required ] ],
    password2: [ '', [ Validators.required ] ],
    terminos: [ false, [ Validators.required ] ],
  }, {  // Validadores ==> existen valores asincronos tambien
    validators: this.passwordsIguales('password', 'password2') // referencia a una función
  })

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) {

  }

  crearUsuario() {

    this.formSumitted = true;
    console.log('Formulario: ',this.registerForm);

    if(this.registerForm.invalid) {
      return; // con esto se evita que el código siga avanzando
    } 

    // console.log('Posteando Formulario');
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe( resp => {
          console.log('Usuario creado')
          console.log('respuesta: ', resp);
          this.router.navigateByUrl('/');
        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error'); // El ultimo es un ícono.
        } )

  }

  campoNoValido( campo: string ): boolean {

    if( this.registerForm.get(campo)?.invalid && this.formSumitted ) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSumitted;
  }

   contraseniasNoValidas(){
      const pass1 = this.registerForm.get('password')?.value;
      const pass2 = this.registerForm.get('password2')?.value;

      if((pass1 !== pass2) && this.formSumitted) {
        return true;
      } else {
        return false;
      }
   }

   // Necesitamos retornar una función
   passwordsIguales(pass1Name: string, pass2Name: string) {

      return ( formGroup: FormGroup ) => { // El FormGroup es la referencia al formulario
        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);

        if(pass1Control?.value === pass2Control?.value) {
          pass2Control?.setErrors(null);
        } else {
          pass2Control?.setErrors({ noEsIgual: true })
        }
      }
   }

}
