import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ComponentsModule } from '../components/components.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
// Componentes de Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    AuthModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
