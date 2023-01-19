import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  userToken: any;
  currentRoomCode: any;
  temporaryMessInfo: any;
  dataSource: any[] = [];
  rout: any;

  constructor(private api: ApiService, private router: Router) {
  }

  cardsInHands: any[] = [];
  players: any[] = [];
  timer: any;
  role:any;
  currentMover:any;

  ngOnInit(): void {
    this.userToken = localStorage.getItem('userToken');
    this.currentRoomCode = localStorage.getItem('gameRoomChosen');

    this.rout = 'game-table';
    localStorage.setItem('rout', '')

    this.api.updateGame(this.userToken, this.currentRoomCode).subscribe(v => {
      this.temporaryMessInfo = v.RESULTS;
      localStorage.setItem('temporaryMessInfo', JSON.stringify(v.RESULTS));


      let cards = this.temporaryMessInfo[4]
      cards['Номер_ваших_карт'].forEach((data: any, index: any) => {
        let cardInf: any = {};
        cardInf.cardNumber = data;
        cardInf.cardDescription = cards['Описание_ваших_карт'][index];
        cardInf.cardTitle = cards['Названия_ваших_карт'][index];
        this.cardsInHands.push(cardInf);
      });

      let players = this.temporaryMessInfo[2];
      players['Номер_в_порядке_хода'].forEach((data: any, index: any) => {
        let playerInf: any = {};
        playerInf.orderNumber = data;
        playerInf.login = players['Логин'][index];
        playerInf.id = players['Номер_игрока'][index];
        if(players['Чей_ход'][index]){
          this.currentMover=players['Логин'][index];
        }
        this.players.push(playerInf);
      });

      this.timer=this.temporaryMessInfo[0]['Осталось_до_конца_хода_в_сек'][0];
      this.role=this.temporaryMessInfo[3]['Ваша_Роль'][0];
      console.log(this.currentMover);


    });
  }
}
