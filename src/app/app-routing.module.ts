import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ofrece directivas como los ngif o ngfor, etc
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

// Rutas

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';

// modulo de rutas


// Creando una constante para mis rutas
const routes: Routes = [
  
  // Documentacion
  // path: '/dashboard', PagesRoutingModule
  // path: '/auth', AuthRoutingModule
  { path: '', redirectTo: 'dashboard', pathMatch:'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
