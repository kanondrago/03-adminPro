import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit{

  resultado:string='';

  usuarios: string[] = [];

  constructor() {

  }

  ngOnInit(): void {

    // this.getUsuarios()
    //   .then((valor:any) => {
    //     valor.forEach((item:any) => {
    //       this.usuarios.push(item.first_name);
    //     })
    //   })

    // Ahora con observables
    this.getUsuariosPromesas()
    .then((valor:any) => {
      valor.forEach((item:any) => {
        this.usuarios.push(item.first_name);
      })
    })

  }

  getUsuarios() {

    const url  = 'https://reqres.in/api/users?page=2';

    const promesa = new Promise((resolve, reject) => {

      fetch(url)
        .then(resp => resp.json())
        .then(body => resolve(body.data))
        .catch(error => reject(error))

    })

    return promesa

  }


  getUsuariosPromesas() {
    const url  = 'https://reqres.in/api/users?page=2';
    return fetch(url)
            .then(resp => resp.json())
            .then(body => body.data)
  }

}
