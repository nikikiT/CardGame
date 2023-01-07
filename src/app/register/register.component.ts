import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private api:ApiService, private router: Router) { //Здесь можно инджектить компоненты

  }

  login = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  fg = new FormGroup(
    {
      login: this.login,
      password: this.password
    }
  )


  onSubmitSignIn(){
    this.router.navigate(['login']);
  }

  onSubmit(){


  }


}
