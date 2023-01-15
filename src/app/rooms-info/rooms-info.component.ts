import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {JoinGameComponent} from "./dialogs/join-game/join-game.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  // selector: 'parent-component',
  selector: 'app-rooms-info',
  templateUrl: './rooms-info.component.html',
  styleUrls: ['./rooms-info.component.css']
})
export class RoomsInfoComponent implements OnInit{

  userToken: any;
  temporaryForMessInfo: any;

  roomToEnterFC = new FormControl('',[Validators.required]);
  roomToEnterPassFc = new FormControl('',[Validators.required]);

  fg = new FormGroup({
    login: this.roomToEnterFC,
    password: this.roomToEnterPassFc
  });

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'roomCode',
    'adminLogin',
    'passwordFromRoom',
    'playersInRoom',
    'buttonToJoin',
    'buttonsToGetInRoom'
  ];

  temporaryPlayersOnline: any;

  roomNumberChosen: any;

  displayedColumnsPlayersOnline: string[] = [
    'playerLogin',

  ];

  playersOnlineDataSource: any[] = [];

  displayedPlayersRooms: any[] = [
    'room_code'
  ];

  playerRoomsDataSource: any[] = [];

  constructor(private api:ApiService, private router: Router, public dialog: MatDialog) {
  }

  onSubmit(roomNumber: any, passwordForRoom: any){ //Есди пароль не введен то заполнить автоматически
    if (passwordForRoom=="Без пароля"){
      passwordForRoom='NULL';
    }
    let data = {
      roomNumber: roomNumber,
      password: passwordForRoom
    }
    const dialogRef = this.dialog.open(JoinGameComponent, {data:data});
    dialogRef.afterClosed().subscribe(data=>{

    })
    console.log("Ввели пароль:"+passwordForRoom);
    this.userToken=JSON.parse(localStorage.getItem('userToken') || '');
    localStorage.setItem('roomNumberChosen',roomNumber);

    //this.api.joinRoom(this.userToken,roomCode,'NULL');
    //this.router.navigate(['gameTable']);
  }

  joinRoom(roomNumber: any, passwordForRoom: any){
    if (passwordForRoom=="Без пароля")
      passwordForRoom='NULL';
    let data = {
      roomNumber: roomNumber,
      password: passwordForRoom
    }
    const dialogRef = this.dialog.open(JoinGameComponent, {data:data});

  }

  ngOnInit() {
    this.temporaryForMessInfo = JSON.parse(localStorage.getItem('messOfInfoResponse') || '');
    let roomData = this.temporaryForMessInfo[2];
    roomData['Логин_админа'].forEach((data: any, index: any) => { //Прошлись по колонке логин админа
      let roomInfo: any = {} //Чтобы собрать строку из колонок
      roomInfo.adminLogin = data
      roomInfo.roomCode = roomData['Код_комнаты'][index]
      roomInfo.passwordFromRoom = roomData['Пароль_от_комнаты'][index]
      roomInfo.playersInRoom = roomData['Игроков_в_комнате'][index]
      this.dataSource.push(roomInfo);
    })

    let playersRoomData = this.temporaryForMessInfo[3];
    playersRoomData['Комнаты в которых вы состоите'].forEach((data: any) =>{
      let playerRoomsInfo: any = {}
      playerRoomsInfo.roomCode=data;
      this.playerRoomsDataSource.push(playerRoomsInfo);
    })


    let playersOnlineData = this.temporaryForMessInfo[1];
    playersOnlineData['Логин'].forEach((data: any, index: any) => {
      let onlinePlayersInfo: any = {}
      onlinePlayersInfo.playerLogin = data;
      //onlinePlayersInfo.lastTimeOnline = onlinePlayersInfo['Последнее_время_онлайн'][index];
      this.playersOnlineDataSource.push(onlinePlayersInfo);
    })

  }
}
