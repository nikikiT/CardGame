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
import {interval, Subscription} from "rxjs";

@Component({
  // selector: 'parent-component',
  selector: 'app-rooms-info',
  templateUrl: './rooms-info.component.html',
  styleUrls: ['./rooms-info.component.css']
})
export class RoomsInfoComponent implements OnInit{

  userToken: any;
  temporaryForMessInfo: any;
  userLogin: any;
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

  subscription: Subscription | null = null;

  constructor(private api:ApiService, private router: Router, public dialog: MatDialog, public helper: HelperService) {
  }
  ngOnInit() {
    this.manageResponse();
    this.getRoomsInfo();
    this.userLogin=localStorage.getItem('myLogin')
    let source = interval(3000);
    this.subscription = source.subscribe(() => {
      this.manageResponse();
      this.getRoomsInfo();
    });
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
    roomData['??????????_????????????'].forEach((data: any, index: any) => { //???????????????? ???? ?????????????? ?????????? ????????????
      let roomInfo: any = {} //?????????? ?????????????? ???????????? ???? ??????????????
      roomInfo.adminLogin = data;
      roomInfo.roomNumber = roomData['??????_??????????????'][index];
      roomInfo.passwordFromRoom = roomData['????????????_????_??????????????'][index];
      roomInfo.playersInRoom = roomData['??????????????_??_??????????????'][index];
      newRooms.push(roomInfo);
    });
    let playersRoomData = this.temporaryForMessInfo[3];
    playersRoomData['?????????????? ?? ?????????????? ???? ????????????????'].forEach((data: any) =>{
      let playerRoomsInfo: any = {};
      playerRoomsInfo.roomNumber=data;
      newPlayerRooms.push(playerRoomsInfo);
    });

    let playersOnlineData = this.temporaryForMessInfo[1];
    playersOnlineData['??????????'].forEach((data: any, index: any) => {
      let onlinePlayersInfo: any = {}
      onlinePlayersInfo.playerLogin = data;
      //onlinePlayersInfo.lastTimeOnline = onlinePlayersInfo['??????????????????_??????????_????????????'][index];
      newPlayersOnline.push(onlinePlayersInfo);
    });

    let playersInRoomsData = this.temporaryForMessInfo[4];
    playersInRoomsData['??????????'].forEach((data: any, index: any) =>{
      let playersInRoomsInfo: any = {}
      playersInRoomsInfo.playerLogin=data;
      playersInRoomsInfo.roomNumber = playersInRoomsData['?????????? ??????????????'][index];
      newPlayersInRooms.push(playersInRoomsInfo);
    });

    let startedRoomsData = this.temporaryForMessInfo[5];
    startedRoomsData['?????????? ???????????? ?????????????? ??????'].forEach((data: any) =>{
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

  joinGame(roomNumber: any, passwordForRoom: any) {
    if (passwordForRoom == "?????? ????????????") {
      passwordForRoom = 'NULL';
    }
    let data = {
      roomNumber: roomNumber,
      password: passwordForRoom
    }
    const dialogRef = this.dialog.open(JoinGameComponent, {data: data});
    dialogRef.afterClosed().subscribe(data => {
      this.subscription?.unsubscribe()
      this.router.navigate(['game-table']);
    })
    this.userToken = JSON.parse(localStorage.getItem('userToken') || '');
    localStorage.setItem('roomNumberChosen', roomNumber);

    //this.api.joinRoom(this.userToken,roomNumber,'NULL');
    //this.router.navigate(['gameTable']).then(
    //       ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
    //this.ngOnInit();
  }

  joinRoom(roomNumber: any, passwordForRoom: any){
    if (passwordForRoom=="?????? ????????????")
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
      //localStorage.setItem('userToken',JSON.stringify(v.RESULTS[0]['??????_??????????'][0]));
      this.messOfInfoResponse=v.RESULTS;
      localStorage.setItem('messOfInfoResponse',JSON.stringify(v.RESULTS));
      this.userToken=v.RESULTS[0]['??????_??????????'][0];
    }, error => {
      alert('??????! ????????????????, ??????-???? ?????????? ???? ??????')
    });

  }

  goBackToLogin(){
    this.router.navigate(['login']).then(
           ()=> {
             document.body.style.backgroundImage = this.helper.getImagePathByURL()
             this.subscription?.unsubscribe()
           })


  }

  isGameStarted(room:any){
    return !this.startedRoomsDataSource.some(p=>p.roomNumber==room.roomNumber)
  }

  hasntJoined(element: any) {
    return !this.playerRoomsDataSource.some(pr => pr.roomNumber==element.roomNumber);
  }
}
