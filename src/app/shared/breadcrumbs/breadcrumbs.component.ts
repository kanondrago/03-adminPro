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

  constructor( private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(data => {
                                                  console.log(data);
                                                  this.titulo = data.titulo;
                                                  document.title = `AdminPro - ${this.titulo}`;
    })
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((event: any) => event.snapshot.data),
    )
  }

}
