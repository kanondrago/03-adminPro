import { Component, OnInit } from '@angular/core';

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

    this.getUsuarios()
      .then((valor:any) => {
        this.usuarios = valor
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

}
