import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs'; // MUY IMPORTANTE
import { retry, take, map, filter } from 'rxjs/operators'; // MUY IMPORTANTE

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('subscripción: ', valor),
    //   (error) => console.log('Error: ',error),
    //   () => console.log('Info obs$ terminado')
    // )

    this.intervalSubs = this.retornoIntervalo().subscribe(
      (valor) => console.log(valor)
    )
  }

  ngOnDestroy(): void {

    this.intervalSubs.unsubscribe()

  }

  retornoIntervalo(): Observable<number> {
    return interval(150)
            .pipe(
              map(valor => valor+1),
              filter(valor => (valor%2===0) ? true : false)
            )
  }


  retornaObservable(): Observable<number> {
    let i = -1;

     return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if(i===4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(i===2) {
          observer.error('Este es el error')
        }


      }, 1000)

    })

  }

}
