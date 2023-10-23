import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

public titulo = '';
public tituloSubs$: Subscription;

  constructor( private router: Router ) {


    this.tituloSubs$ = this.getArgumentoRuta().subscribe(({titulo}) => {
                        this.titulo = titulo;
                        document.title = `AdminPro - ${titulo}`
                      })
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

    getArgumentoRuta() {
      return this.router.events.pipe(
        filter((event:any) => {
          return event instanceof ActivationEnd;
        }),
        filter((value:ActivationEnd) => {
          return value.snapshot.firstChild === null;
        }),
        map((value:ActivationEnd) => {
          return value.snapshot.data
        })
      )
    }


}
