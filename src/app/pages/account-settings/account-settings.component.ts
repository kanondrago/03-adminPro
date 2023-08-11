import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  constructor() {
  }

  // Salto al DOM // No olvidar el tipado muy IMPORTANTE 
  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element> = document.querySelectorAll('.selector');


  
  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`

    // Vanilla Javascript
    this.linkTheme!.setAttribute('href', url);

    // Local Storage
    localStorage.setItem('Selected theme', url);

    this.checkCurrentTheme()

  }

  checkCurrentTheme() {
    
    this.links.forEach(elem => {
      
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
