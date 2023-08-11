import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{

  linkTheme = document.querySelector('#theme')

  ngOnInit(): void {
    // href="./assets/css/colors/default-dark.css"
    // const localStorageGet = window.localStorage.getItem('Selected theme'); ojo con el window
    const localStorageGet = localStorage.getItem('Selected theme') || "./assets/css/colors/default.css"

    this.linkTheme?.setAttribute('href', localStorageGet);

  }

}
