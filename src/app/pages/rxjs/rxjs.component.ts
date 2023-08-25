import { Component } from '@angular/core';
import { Observable } from 'rxjs'; // MUY IMPORTANTE

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  constructor() {
    
    
    const obs$ = new Observable( observer => {
      
      let i = 0;

      const intervalo = setInterval(() => {
        console.log('tick');
        // Emitiendo el valor:
        i++;
        observer.next(i);

        if(i===8) {
          clearInterval(intervalo);
          // Notificar que ya se cancelo el observable
          observer.complete()
        }

        if(i===2) {
          // Disparar el error
          clearInterval(intervalo);
          observer.error('la variable i llego al valor de 2')
        }

      }, 1000)

    } );

    // valor --> es el valor de la subscripción
    // error --> es el error del observer
    // () --> no recibe argumento y cuando el observable termina


    obs$.subscribe( 
      valor => { console.log('En la subscripción: ', valor) },
      error => { console.log('Error en la subscripción: ', error)},
      () => console.log('Observable terminado ;)')
    );


    // const observable$ = new Observable((observer) => {

    //   console.log('hola')

    //   let i = 0;

    //   const intervalo = setInterval(() => {
    //     i++;
    //     observer.next(i);

    //     if(i===15){
    //       observer.error('Error el observer: i = 5');
    //     }

    //     if(i===10) {
    //       observer.complete();
    //     }

    //   }, 1000);

    // });

    // observable$.subscribe(valor => {
    //   console.log(valor);
    // }, error => {
    //   console.log('ERROR ENVIADO: ', error);
    // }, () => {
    //   console.log('Oberver compleado');
    // });



  }

}
