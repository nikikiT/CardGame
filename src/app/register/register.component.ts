import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HelperService} from "../../services/helper.service";

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
  );

  errorMsg = null
  constructor(private api:ApiService, private router: Router, private helper: HelperService) { //Здесь можно инджектить компоненты
  }

  onSubmitSignIn(){
    this.router.navigate(['login']);
  }

  onSubmit() {
    this.rout = 'register';
    localStorage.setItem('rout', this.rout);
    let dataToRegister = {
      login: this.login.value || '',
      password: this.password.value || '',
    }

    this.api.regNewUser(dataToRegister.login, dataToRegister.password)
      .subscribe(v => {
        if (v.RESULTS[0].rus_error){
          this.errorMsg = v.RESULTS[0].rus_error[0];
          alert(this.errorMsg)
          return;
        }
        this.router.navigate(['login']).then(
          ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
      }, error => {
        alert('Сервер не смог вас зарегистрировать');
      });

  }


}
