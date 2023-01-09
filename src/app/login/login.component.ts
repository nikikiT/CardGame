import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private api:ApiService, private router: Router) { //Здесь можно инджектить компоненты
  }

  login = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  //response = new
  userToken: any;

  messOfInfoResponse: any;

  playersOnlineResponse: any;

  fg = new FormGroup({
      login: this.login,
      password: this.password
  });



  ngOnInit(): void {}


  onSubmitReg(){
    this.router.navigate(['register'])
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
          console.log(this.userToken);
          localStorage.setItem('userToken',JSON.stringify(v.RESULTS[0]['Ваш_токен'][0]));
          this.messOfInfoResponse=v.RESULTS;
          localStorage.setItem('messOfInfoResponse',JSON.stringify(v.RESULTS));
          this.userToken=v.RESULTS[0]['Ваш_токен'][0];
          this.router.navigate(['gamesHub']);
        },error => {
          alert('Упс! Простите, что-то пошло не так')
        })
    }
  }



}
