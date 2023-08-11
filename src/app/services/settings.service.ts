import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  // Consulta al DOM
  private linkTheme = document.querySelector('#theme')

  constructor() { 
    // href="./assets/css/colors/default-dark.css"
    // const localStorageGet = window.localStorage.getItem('Selected theme'); ojo con el window
    const localStorageGet = localStorage.getItem('Selected theme') || "./assets/css/colors/default.css"
    this.linkTheme?.setAttribute('href', localStorageGet);

  }

  


}
