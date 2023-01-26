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
        switch (cards['Названия_ваших_карт'][index]) {
          case 'Нечто': cardInf.cardImg = "url('assets/Cards/1_the_thing.png')"
            break;
          case 'Заражение!': cardInf.cardImg="url('assets/Cards/5_infection.png')"
            break;
          case 'Подозрение' : cardInf.cardImg="url('assets/Cards/32_suspend.png')"
            break;
          case 'Огнемет': cardInf.cardImg = "url('assets/Cards/22_flame_thrower.png')"
            break;
          case 'Топор': cardInf.cardImg="url('assets/Cards/30_axe.png')"
            break;
          case 'Виски' : cardInf.cardImg="url('assets/Cards/40_whiskey.png')"
            break;
          case 'Упорство': cardInf.cardImg="url('assets/Cards/43_pirsistance.png')"
            break;
          case 'Гляди по сторонам' : cardInf.cardImg="url('assets/Cards/48_watch_out.png')"
            break;
          case 'Мне и здесь неплохо': cardInf.cardImg = "url('assets/Cards/71_im_chillin.png')"
            break;
          case 'Нет уж, спасибо!': cardInf.cardImg="url('assets/Cards/74_no_thanks.png')"
            break;
          case 'Мимо!' : cardInf.cardImg="url('assets/Cards/78_miss.png')"
            break;
          case 'Заколоченная дверь': cardInf.cardImg = "url('assets/Cards/86_close_door.png')"
            break;
          case '...три, четыре...' : cardInf.cardImg="url('assets/Cards/94_three_four.png')"
            break;
          case 'Меняемся местами!' : cardInf.cardImg="url('assets/Cards/50_change_places.png')"
            break;
          case 'Забывчивость': cardInf.cardImg = "url('assets/Cards/98_forget.png')"
            break;
          case 'Цепная реакция': cardInf.cardImg="url('assets/Cards/98_forget.png')"
            break;
          case 'Соблазн' : cardInf.cardImg="url('assets/Cards/61_seduce.png')"
            break;
          case 'Никакого шашлыка!' : cardInf.cardImg="url('assets/Cards/81_not_burning.png')"
            break;
        }
        cardInf.cardNumber = data;
        cardInf.cardDescription = cards['Описание_ваших_карт'][index];
        cardInf.cardTitle = cards['Названия_ваших_карт'][index];
        this.cardsInHands.push(cardInf);
        console.log(this.cardsInHands);
        console.log(cards);
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
