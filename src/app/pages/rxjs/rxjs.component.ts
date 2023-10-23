import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs'; // MUY IMPORTANTE
import { retry, take, map, filter } from 'rxjs/operators'; // MUY IMPORTANTE

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  // public intervalSubs: Subscription;

  public intervalSubs: Subscription;

  constructor() {

    // El observer es quien emite los valores

    // this.returnObservable().pipe(retry(1)).subscribe({
    //   next: (emision) => {
    //     console.log(emision);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });

    // this.intervalSubs = this.retornaInterval()
    //   .subscribe( console.log )

    this.intervalSubs = this.returnInterval().subscribe( console.log )

  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // this.intervalSubs.unsubscribe();
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {

    // take -> Toma todos los valores que se desee
    // map -> Transforma la informacion que recibe el observable y la muta 
    // de la manera que se necesite

    const interval$ = interval(125)
    .pipe(
        map( valor => {
          return valor+1;
        }),
        filter(valor => {
          return (valor%3===0)? true: false
        }),
      );

    return interval$;

  }

  returnObservable():Observable<number> {
    let i =-1;

    const obs$ = new Observable<number>((observer) => {
      
      
      const intervalo = setInterval(() => {
        i++;

        observer.next(i);

        if (i===4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(i===2) {
          observer.error('tenemos un error con i=2');
        }

      }, 350)
    });

    return obs$;
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
