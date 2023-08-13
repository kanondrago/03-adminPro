import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{


  ngOnInit(): void {

  }

  constructor( private router: Router) {
    
  }

  login() {
    this.router.navigateByUrl('/');
  }

}
