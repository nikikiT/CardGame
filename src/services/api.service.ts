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
    fd.append('p1',login);
    fd.append('p2',password);

    return  this.http.post(this.URL,fd)
  }

  signIn(capsuleForLogin: any): Observable<any>{

    let fd = new FormData();
    fd.append('pname','sign_in');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',capsuleForLogin.login);
    fd.append('p2',capsuleForLogin.password);

    return this.http.post(this.URL,fd)
  }

  updateInfo(token: string): Observable<any>{

    let fd = new FormData();
    fd.append('pname','update_info');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);

    return  this.http.post(this.URL,fd)
  }

  newRoom(token: string, roundDuration: string, password: string){

    let fd = new FormData();
    fd.append('pname','new_room');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roundDuration);
    fd.append('p3',password);

    return  this.http.post(this.URL,fd)
  }

  joinRoom(token: string, roomNumber: string, password: string){
    let fd = new FormData();
    fd.append('pname','join_room');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);
    fd.append('p3',password);

    return  this.http.post(this.URL,fd)
  }

  startGame(token: string, roomNumber: string){
    let fd = new FormData();
    fd.append('pname','start_game');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);

    return  this.http.post(this.URL,fd)
  }

  updateGame(token: string, roomNumber: string): Observable<any>{
    let fd = new FormData();
    fd.append('pname','update_game');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);

    return  this.http.post(this.URL,fd);
  }

  changeCards(token: string, roomNumber: string, card: string){
    let fd = new FormData();
    fd.append('pname','change_cards');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',card);
    fd.append('p3',roomNumber);

    return  this.http.post(this.URL,fd);
  }

  playCard(token: string, roomNumber: string, idCard: string, targetLogin: string, idCardAdditional: string){
    let fd = new FormData();
    fd.append('pname','play_card');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);
    fd.append('p3',idCard);
    fd.append('p4',targetLogin);
    fd.append('p5',idCardAdditional); //Null в большинстве случаев кроме одной специальной карты (Соблазн)

    return  this.http.post(this.URL,fd);
  }

  dropCard(token: string, roomNumber: string, idCard: string){
    let fd = new FormData();
    fd.append('pname','drop_card');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);
    fd.append('p3',idCard);


    return  this.http.post(this.URL,fd);
  }

  defend(token: string, roomNumber: string, idCard: string){
    let fd = new FormData();
    fd.append('pname','defend');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);
    fd.append('p3',idCard);


    return  this.http.post(this.URL,fd);
  }

  passEffect(token: string, roomNumber: string, idCard: string){
    let fd = new FormData();
    fd.append('pname','pass_e');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);
    fd.append('p3',idCard); //Null в большинстве случаев кроме одной специальной карты (Соблазн)


    return  this.http.post(this.URL,fd);
  }

  //Не обязательна
  leaveRoom(token: string, roomNumber: string, password: string){
    let fd = new FormData();
    fd.append('pname','leave_room');
    fd.append('db','298479');
    fd.append('format','columns_compact');
    fd.append('p1',token);
    fd.append('p2',roomNumber);
    fd.append('p3',password);

    return  this.http.post(this.URL,fd);
  }

}
