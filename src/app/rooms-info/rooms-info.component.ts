import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {JoinGameComponent} from "./dialogs/join-game/join-game.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {JoinRoomComponent} from "./dialogs/join-room/join-room.component";
import {CreateRoomComponent} from "./dialogs/create-room/create-room.component";
import {HelperService} from "../../services/helper.service";
import {StartGameComponent} from "./dialogs/start-game/start-game.component";

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
    'roomNumber',
    'adminLogin',
    'passwordFromRoom',
    'playersInRoom',
    'buttonToJoin',
    'buttonsToStartGame',
    'buttonsToGetInRoom',
  ];

  displayedPlayersInRooms: string[] = [
      'playerLogin',
      'roomNumber'
  ];

  playersInRoomDataSource: any[] = [];

  startedRoomsDataSource: any[] = [];

  rout:any;

  temporaryPlayersOnline: any;
  errorMsg: any;
  roomNumberChosen: any;

  displayedColumnsPlayersOnline: string[] = [
    'playerLogin',

  ];

  playersOnlineDataSource: any[] = [];

  displayedPlayersRooms: string[] = [
    'room_code'
  ];

  playerRoomsDataSource: any[] = [];
  private messOfInfoResponse: any;

  constructor(private api:ApiService, private router: Router, public dialog: MatDialog, public helper: HelperService) {
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

    //this.api.joinRoom(this.userToken,roomNumber,'NULL');
    //this.router.navigate(['gameTable']).then(
    //       ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
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

  startGame(roomNumber: any){
    let data = {
      roomNumber: roomNumber
    }
    const dialogStartGameRef = this.dialog.open(StartGameComponent,{data:data}).afterClosed()
      .subscribe( v =>{
        if (v)
          this.getRoomsInfo();
      });
  }
  createRoom(){
    const dialogCreateRoomRef = this.dialog.open(CreateRoomComponent, {}).afterClosed().subscribe( v =>{
      if(v)
        this.getRoomsInfo();
    });
  }

  manageResponse(){
    this.userToken = JSON.parse(localStorage.getItem('userToken') || '');
    this.api.updateInfo(this.userToken).subscribe(v =>{
      if (v.RESULTS[0].rus_error) {
        this.errorMsg = v.RESULTS[0].rus_error[0]
        alert(this.errorMsg)
        return;
      }
      this.errorMsg = null;
      //localStorage.setItem('userToken',JSON.stringify(v.RESULTS[0]['Ваш_токен'][0]));
      this.messOfInfoResponse=v.RESULTS;
      localStorage.setItem('messOfInfoResponse',JSON.stringify(v.RESULTS));
      this.userToken=v.RESULTS[0]['Ваш_токен'][0];
    }, error => {
      alert('Упс! Простите, что-то пошло не так')
    });

  }

  ngOnInit() {
    this.manageResponse();
    this.getRoomsInfo();
  }

  goBackToLogin(){
    this.router.navigate(['login']).then(
           ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
  }

  getRoomsInfo(){
    let newRooms: any[] = [];
    let newPlayerRooms: any[] = [];
    let newPlayersOnline: any[] = [];
    let newPlayersInRooms: any[] = [];
    let newStarted: any[] = [];

    this.rout='games-hub';
    localStorage.setItem('rout',this.rout);

    this.temporaryForMessInfo = JSON.parse(localStorage.getItem('messOfInfoResponse') || '');

    let roomData = this.temporaryForMessInfo[2];
    roomData['Логин_админа'].forEach((data: any, index: any) => { //Прошлись по колонке логин админа
      let roomInfo: any = {} //Чтобы собрать строку из колонок
      roomInfo.adminLogin = data;
      roomInfo.roomNumber = roomData['Код_комнаты'][index];
      roomInfo.passwordFromRoom = roomData['Пароль_от_комнаты'][index];
      roomInfo.playersInRoom = roomData['Игроков_в_комнате'][index];
      newRooms.push(roomInfo);
    });
    let playersRoomData = this.temporaryForMessInfo[3];
    playersRoomData['Комнаты в которых вы состоите'].forEach((data: any) =>{
      let playerRoomsInfo: any = {};
      playerRoomsInfo.roomNumber=data;
      newPlayerRooms.push(playerRoomsInfo);
    });

    let playersOnlineData = this.temporaryForMessInfo[1];
    playersOnlineData['Логин'].forEach((data: any, index: any) => {
      let onlinePlayersInfo: any = {}
      onlinePlayersInfo.playerLogin = data;
      //onlinePlayersInfo.lastTimeOnline = onlinePlayersInfo['Последнее_время_онлайн'][index];
      newPlayersOnline.push(onlinePlayersInfo);
    });

    let playersInRoomsData = this.temporaryForMessInfo[4];
    playersInRoomsData['Логин'].forEach((data: any, index: any) =>{
      let playersInRoomsInfo: any = {}
      playersInRoomsInfo.playerLogin=data;
      playersInRoomsInfo.roomNumber = playersInRoomsData['Номер комнаты'][index];
      newPlayersInRooms.push(playersInRoomsInfo);
    });

    let startedRoomsData = this.temporaryForMessInfo[5];
    startedRoomsData['Номер комнат начатых игр'].forEach((data: any) =>{
      let startedRoomsInfo: any = {}
      startedRoomsInfo.roomNumber = data;
      newStarted.push(startedRoomsInfo);
    });

    this.roomsDataSource = newRooms;
    this.playerRoomsDataSource = newPlayerRooms;
    this.playersOnlineDataSource = newPlayersOnline;
    this.playersInRoomDataSource = newPlayersInRooms;
    this.startedRoomsDataSource = newStarted;
  }

  isGameStarted(room:any){
    return !this.startedRoomsDataSource.some(p=>p.roomNumber==room.roomNumber)
  }
}
