import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  login = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  //response = new
  userToken: any;
  errorMsg = null
  rout: any;
  messOfInfoResponse: any;
  playersOnlineResponse: any;

  fg = new FormGroup({
    login: this.login,
    password: this.password
  });
  constructor(private api:ApiService, private router: Router, private helper: HelperService) { //Здесь можно инджектить компоненты
  }



  ngOnInit(): void {
  }


  onSubmitReg(){
    this.router.navigate(['register']).then(
      ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
  }

  onSubmit(){ //при нажатии на сабмит он проверяет
    //Форм контрол проверка на валидность формы
    if(this.login.valid){
      let capsuleForLogin = {
        login: this.login.value || '',
        password: this.password.value || '',
      }
      this.api.signIn(capsuleForLogin)
        .subscribe(v=> {
          //v.RESULTS - это массив из 4 объектов из которых 0-й - содержит токен.

          if (v.RESULTS[0].rus_error) {
            this.errorMsg = v.RESULTS[0].rus_error[0]
            alert(this.errorMsg)
            return;
          }
          this.errorMsg = null;
          localStorage.setItem('userToken',JSON.stringify(v.RESULTS[0]['Ваш_токен'][0]));
          localStorage.setItem('myLogin',this.login.value||'');
          this.messOfInfoResponse=v.RESULTS;
          localStorage.setItem('messOfInfoResponse',JSON.stringify(v.RESULTS));
          this.userToken=v.RESULTS[0]['Ваш_токен'][0];
          this.router.navigate(['games-hub']).then(
            ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
        },error => {
          alert('Упс! Простите, что-то пошло не так')
        })
    }
  }



}
