import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {JoinGameComponent} from "./dialogs/join-game/join-game.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {JoinRoomComponent} from "./dialogs/join-room/join-room.component";
import {CreateRoomComponent} from "./dialogs/create-room/create-room.component";

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

  roomsDataSource: any[] = [];
  displayedColumns: string[] = [
    'roomCode',
    'adminLogin',
    'passwordFromRoom',
    'playersInRoom',
    'buttonToJoin',
    'buttonsToGetInRoom'
  ];

  rout:any;

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

  joinGame(roomNumber: any, passwordForRoom: any) {
    if (passwordForRoom == "Без пароля") {
      passwordForRoom = 'NULL';
    }
    let data = {
      roomNumber: roomNumber,
      password: passwordForRoom
    }
    const dialogRef = this.dialog.open(JoinGameComponent, {data: data});
    dialogRef.afterClosed().subscribe(data => {

    })
    this.userToken = JSON.parse(localStorage.getItem('userToken') || '');
    localStorage.setItem('roomNumberChosen', roomNumber);

    //this.api.joinRoom(this.userToken,roomCode,'NULL');
    //this.router.navigate(['gameTable']);
    //this.ngOnInit();
  }

  joinRoom(roomNumber: any, passwordForRoom: any){
    if (passwordForRoom=="Без пароля")
      passwordForRoom='NULL';
    let data = {
      roomNumber: roomNumber,
      password: passwordForRoom
    }
    const dialogRef = this.dialog.open(JoinRoomComponent, {data:data});
    dialogRef.afterClosed().subscribe(v=>{
      if (v){
        this.getRoomsInfo();
      }
    })
  }

  createRoom(){

    const dialogCreateRoomRef = this.dialog.open(CreateRoomComponent, {});
  }

  ngOnInit() {
    let newRooms: any[] = [];
    let newPlayerRooms: any[] = [];
    let newPlayersOnline: any[] = [];
    this.rout='games-hub';
    localStorage.setItem('rout',this.rout);

    this.temporaryForMessInfo = JSON.parse(localStorage.getItem('messOfInfoResponse') || '');
    let roomData = this.temporaryForMessInfo[2];

    roomData['Логин_админа'].forEach((data: any, index: any) => { //Прошлись по колонке логин админа
      let roomInfo: any = {} //Чтобы собрать строку из колонок
      roomInfo.adminLogin = data;
      roomInfo.roomCode = roomData['Код_комнаты'][index];
      roomInfo.passwordFromRoom = roomData['Пароль_от_комнаты'][index];
      roomInfo.playersInRoom = roomData['Игроков_в_комнате'][index];
      newRooms.push(roomInfo);
    })

    let playersRoomData = this.temporaryForMessInfo[3];
    playersRoomData['Комнаты в которых вы состоите'].forEach((data: any) =>{
      let playerRoomsInfo: any = {};
      playerRoomsInfo.roomCode=data;
      newPlayerRooms.push(playerRoomsInfo);
    })

    let playersOnlineData = this.temporaryForMessInfo[1];
    playersOnlineData['Логин'].forEach((data: any, index: any) => {
      let onlinePlayersInfo: any = {}
      onlinePlayersInfo.playerLogin = data;
      //onlinePlayersInfo.lastTimeOnline = onlinePlayersInfo['Последнее_время_онлайн'][index];
      newPlayersOnline.push(onlinePlayersInfo);
    })

    this.roomsDataSource = newRooms;
    this.playerRoomsDataSource = newPlayerRooms
    this.playersOnlineDataSource = newPlayersOnline
  }

  getRoomsInfo(){
    let newRooms: any[] = [];
    let newPlayerRooms: any[] = [];
    let newPlayersOnline: any[] = [];
    this.rout='games-hub';
    localStorage.setItem('rout',this.rout);

    this.temporaryForMessInfo = JSON.parse(localStorage.getItem('messOfInfoResponse') || '');
    let roomData = this.temporaryForMessInfo[1];

    roomData['Логин_админа'].forEach((data: any, index: any) => { //Прошлись по колонке логин админа
      let roomInfo: any = {} //Чтобы собрать строку из колонок
      roomInfo.adminLogin = data;
      roomInfo.roomCode = roomData['Код_комнаты'][index];
      roomInfo.passwordFromRoom = roomData['Пароль_от_комнаты'][index];
      roomInfo.playersInRoom = roomData['Игроков_в_комнате'][index];
      newRooms.push(roomInfo);
    })

    let playersRoomData = this.temporaryForMessInfo[2];
    playersRoomData['Комнаты в которых вы состоите'].forEach((data: any) =>{
      let playerRoomsInfo: any = {};
      playerRoomsInfo.roomCode=data;
      newPlayerRooms.push(playerRoomsInfo);
    })

    let playersOnlineData = this.temporaryForMessInfo[0];
    playersOnlineData['Логин'].forEach((data: any, index: any) => {
      let onlinePlayersInfo: any = {}
      onlinePlayersInfo.playerLogin = data;
      //onlinePlayersInfo.lastTimeOnline = onlinePlayersInfo['Последнее_время_онлайн'][index];
      newPlayersOnline.push(onlinePlayersInfo);
    })

    this.roomsDataSource = newRooms;
    this.playerRoomsDataSource = newPlayerRooms
    this.playersOnlineDataSource = newPlayersOnline
  }
}
