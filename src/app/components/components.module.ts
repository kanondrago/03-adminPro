import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas
import { FormsModule } from '@angular/forms';

// Components
import { IncrementadorComponent } from './incrementador/incrementador.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
  ],
  exports: [
    IncrementadorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
