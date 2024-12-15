import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService, 
    private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.waitForGoogleAPI();
  }

  waitForGoogleAPI() {
    const interval = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        this.googleInit();
        clearInterval(interval); // Detener el intervalo una vez cargado
      }
    }, 100); // Verificar cada 100ms
  }

  googleInit() {
    this.usuarioService.googleInit()
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // Personalización
    );
  }

  login() {
    this.usuarioService.login(this.loginForm.value as LoginForm)
      .subscribe(resp => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value as string);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

}