import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs'; // MUY IMPORTANTE
import { retry, take, map, filter } from 'rxjs/operators'; // MUY IMPORTANTE

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  constructor() {

    // valor --> es el valor de la subscripción
    // error --> es el error del observer
    // () --> no recibe argumento y cuando el observable termina

    // pipe nos ayuda a conectar una tuberia 
    // this.retornaObservable().subscribe( 
    //   valor => console.log('En la subscripción: ', valor) ,
    //   error => console.log('Error en la subscripción: ', error),
    //   () => console.log('Observable terminado ;)')
    // );

    this.retornaInterval()
      .subscribe( console.log )


  }

  retornaInterval(): Observable<string> {

    // RXJS son Operadores que van en cadena

    return interval(100)
            .pipe(
              map( valor => {
                return (valor+1);
              }),
              filter((valor:any) => {
                return ( (valor % 2 ) === 0 ) ? true: false;
              })
            )
  }

  retornaObservable(): Observable<number>{
    let i = -1; // Para que no se inicie de nuevo

    const obs$ = new Observable<number>( observer => {
      
      
      const intervalo = setInterval(() => {
        i++;
        // Emitiendo el valor:
        console.log(i);
        observer.next(i);
        

        if(i===4) {
          clearInterval(intervalo);
          // Notificar que ya se cancelo el observable
          observer.complete()
        }

        if(i===2) {
          // Disparar el error
          // console.log('i=2 .... error')
          observer.error('la variable i llego al valor de 2')
        }

      }, 1000)

    } );

    return obs$;
  }

}
