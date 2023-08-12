import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  // Consulta al DOM
  private linkTheme = document.querySelector('#theme');


  constructor() { 
    // href="./assets/css/colors/default-dark.css"
    // const localStorageGet = window.localStorage.getItem('Selected theme'); ojo con el window
    const localStorageGet = localStorage.getItem('Selected theme') || "./assets/css/colors/default.css"
    this.linkTheme?.setAttribute('href', localStorageGet);
  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`

    // Vanilla Javascript
    this.linkTheme!.setAttribute('href', url);

    // Local Storage
    localStorage.setItem('Selected theme', url);

    this.checkCurrentTheme()

  }


  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })

  }


}
