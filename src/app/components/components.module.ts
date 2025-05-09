import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts'; // Modulo de graficos

// Components
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent, // Se exporta porque sera utilizado fuera del modulo
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
    
  ]
})
export class ComponentsModule { }
