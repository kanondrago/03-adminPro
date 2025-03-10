import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts'; // Modulo de graficos

// Components
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
    
  ]
})
export class ComponentsModule { }
