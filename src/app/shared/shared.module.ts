import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
