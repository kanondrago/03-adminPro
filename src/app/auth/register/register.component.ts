import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre: [ 'Ronald', [ Validators.required, Validators.minLength(3) ]],
    email: [ 'ronald@mail.com', [ Validators.required ,Validators.email ] ],
    password: [ '12345', [ Validators.required ] ],
    password2: [ '12345', [ Validators.required ] ],
    terminos: [ true, [ Validators.required ] ],
  }, {  // Validadores ==> existen valores asincronos tambien
    validators: this.passwordsIguales('password', 'password2')
  })

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {

  }

  crearUsuario() {

    this.formSumitted = true;
    console.log('Formulario: ',this.registerForm);

    if(this.registerForm.invalid) {
    }

    console.log('Posteando Formulario');
    this.usuarioService.crearUsuario(this.registerForm.value);

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
      return ( formGroup: FormGroup ) => {
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
