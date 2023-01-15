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
  login = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  rout: any;
  fg = new FormGroup(
    {
      login: this.login,
      password: this.password
    }
  )
  constructor(private api:ApiService, private router: Router) { //Здесь можно инджектить компоненты
    this.rout='register';
    localStorage.setItem('rout',this.rout);
  }




  onSubmitSignIn(){
    this.router.navigate(['login']);
  }

  onSubmit(){


  }


}
