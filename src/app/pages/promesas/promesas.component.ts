import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit{

  constructor() {

  }

  ngOnInit(): void {

    // this.getUsuariosPromesas()

    // this.getUsuariosAsyncAwait()

    // this.getUsuariosPromesasReturn()
    //   .then((data:any) => {
    //     data.forEach((elem:any) => {
    //       console.log(elem.first_name);
    //     })
    //   })

    this.getUsuariosAsyncAwaitReturn()
      .then(data => {
        data.data.forEach((elem:any) => {
          console.log(elem.first_name);
        })
      })
  }

  getUsuariosPromesas() {
    const url = 'https://reqres.in/api/users?page=2'
    
    let promesa = fetch(url);

    promesa
      .then(data => {
        return data.json();
      })
      .then(datos => {
        const {data} = datos;
        data.forEach( (obj:any) => {
          console.log(obj.first_name);
        })
      })
    
  }

  async getUsuariosAsyncAwait() {
    const url = 'https://reqres.in/api/users?page=2';

    let result = await fetch(url);

    let datos = await result.json();
    
    // console.log(datos);

    const {data} = datos; // destruction

    // console.log(data);
    
    data.forEach((obj:any) => {
      console.log(obj.first_name);
    })

  }

  getUsuariosPromesasReturn() {

    const url = 'https://reqres.in/api/users?page=2';

    let promesa = new Promise((resolve) => {
      fetch(url)
        .then(data => data.json())
        .then(body => resolve(body.data));
    })

    return promesa;

  }

  async getUsuariosAsyncAwaitReturn() {
    const url = 'https://reqres.in/api/users?page=2';

    let resultado = await fetch(url);
    let data = await resultado.json();

    return data;
  }

}
