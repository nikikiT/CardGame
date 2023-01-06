import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = 'https://sql.lavro.ru/call.php'
  constructor( private  http: HttpClient) { }

  regNewUser(login: string, password: string): Observable<any>{
    let fd = new FormData();
    fd.append('pname','reg_new_user');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('lg',login);
    fd.append('pw',password);

    return  this.http.post(this.URL,fd)
  }

  signIn(login: string, password: string) :Observable<any>{

    let fd = new FormData();
    fd.append('pname','sign_in');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('lg',login);
    fd.append('pw',password);

    return  this.http.post(this.URL,fd)
  }

  updateInfo(token: string): Observable<any>{

    let fd = new FormData();
    fd.append('pname','update_info');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);

    return  this.http.post(this.URL,fd)
  }

  newRoom(token: string, roundDuration: string, password: string){

    let fd = new FormData();
    fd.append('pname','new_room');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rd',roundDuration);
    fd.append('pw',password);

    return  this.http.post(this.URL,fd)
  }

  joinRoom(token: string, roomNumber: string, password: string){
    let fd = new FormData();
    fd.append('pname','join_room');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rn',roomNumber);
    fd.append('pw',password);

    return  this.http.post(this.URL,fd)
  }

  startGame(token: string, roomNumber: string){
    let fd = new FormData();
    fd.append('pname','start_game');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rn',roomNumber);

    return  this.http.post(this.URL,fd)
  }

  updateGame(token: string, roomNumber: string){
    let fd = new FormData();
    fd.append('pname','update_game');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('room_numb',roomNumber);

    return  this.http.post(this.URL,fd);
  }

  changeCards(token: string, roomNumber: string, card: string){
    let fd = new FormData();
    fd.append('pname','change_cards');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rc',card);
    fd.append('card',roomNumber);

    return  this.http.post(this.URL,fd);
  }

  playCard(token: string, roomNumber: string, idCard: string, targetLogin: string, idCardAdditional: string){
    let fd = new FormData();
    fd.append('pname','play_card');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rc',roomNumber);
    fd.append('id_c',idCard);
    fd.append('target',targetLogin);
    fd.append('id_c_additional',idCardAdditional); //Null в большинстве случаев кроме одной специальной карты (Соблазн)

    return  this.http.post(this.URL,fd);
  }

  dropCard(token: string, roomNumber: string, idCard: string){
    let fd = new FormData();
    fd.append('pname','drop_card');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rc',roomNumber);
    fd.append('id_c',idCard);


    return  this.http.post(this.URL,fd);
  }

  defend(token: string, roomNumber: string, idCard: string){
    let fd = new FormData();
    fd.append('pname','defend');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rc',roomNumber);
    fd.append('id_c_def',idCard);


    return  this.http.post(this.URL,fd);
  }

  passEffect(token: string, roomNumber: string, idCard: string){
    let fd = new FormData();
    fd.append('pname','pass_e');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rc',roomNumber);
    fd.append('change_from_passed',idCard); //Null в большинстве случаев кроме одной специальной карты (Соблазн)


    return  this.http.post(this.URL,fd);
  }



  //Не обязательна
  leaveRoom(token: string, roomNumber: string, password: string){
    let fd = new FormData();
    fd.append('pname','leave_room');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('tk',token);
    fd.append('rn',roomNumber);
    fd.append('pw',password);

    return  this.http.post(this.URL,fd);
  }

}
