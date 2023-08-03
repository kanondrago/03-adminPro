import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
      this.btnClass = `btn ${this.btnClass}`;
  }

  // El padre envia este input (En este caso el input e el progress)
  @Input('valor') progreso: number = 30;
  @Input('botonClase') btnClass: string = 'btn-primary';

  // Para emitir algo se utiliza el decorador outPut
  // Valor output sin inicializar   
  // @Output() valorSalida: EventEmitter<number>;
  // Valor output inicializado
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter()



  // Funcion nueva
  // get getProgress(){
  //   return `${this.progreso}%`
  // }

  cambiarValor(valor: number) {

    if(this.progreso>=100 && valor>0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso<=5 && valor<0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.valorSalida.emit(this.progreso+valor);
    return this.progreso=this.progreso+valor
  }
}
