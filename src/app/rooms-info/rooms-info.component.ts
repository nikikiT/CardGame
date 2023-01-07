import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-rooms-info',
  templateUrl: './rooms-info.component.html',
  styleUrls: ['./rooms-info.component.css']
})
export class RoomsInfoComponent implements OnInit{

  temporaryForMessInfo: any;
  displayedColumns: string[] = [
    'roomCode',
    'adminLogin',
    'passwordFromRoom',
    'playersInRoom'
  ];
  dataSource: any[] = [];


  constructor(private api:ApiService, private router: Router) { //Здесь можно инджектить компоненты

  }

  ngOnInit(){
    this.temporaryForMessInfo = JSON.parse(localStorage.getItem('messOfInfoResponse') || '') ;
    let roomData = this.temporaryForMessInfo[2];
    roomData['Логин_админа'].forEach((data: any,index: any) => { //Прошлись по колонке логин админа
      let roomInfo: any = {} //Чтобы собрать строку из колонок
      roomInfo.adminLogin = data
      roomInfo.roomCode = roomData['Код_комнаты'][index]
      roomInfo.passwordFromRoom = roomData['Пароль_от_комнаты'][index]
      roomInfo.playersInRoom = roomData['Игроков_в_комнате'][index]
      this.dataSource.push(roomInfo);

    })
    console.log(this.dataSource)

  }


}
