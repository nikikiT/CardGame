import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {HelperService} from "../../../services/helper.service";
import {MatDialog} from "@angular/material/dialog";
import {CardsInHandsComponent} from "./dialogs/cards-in-hands/cards-in-hands.component";
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  userToken: any;
  currentRoomCode: any;
  temporaryMessInfo: any;
  dataSource: any[] = [];
  rout: any;
  cardsInHands: any[] = [];
  players: any[] = [];
  timer: any;
  role:any;
  currentMover:any;
  message: any;
  subscription: Subscription | null = null;

  constructor(private api: ApiService, private router: Router, public helper: HelperService, public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.getGameInfo()
    let source = interval(3000)
    this.subscription = source.subscribe(()=>this.getGameInfo())
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
  backToInfo() {
    this.router.navigate(['games-hub']).then(
      () => {
        document.body.style.backgroundImage = this.helper.getImagePathByURL()
      });
  }

  pickCard(card: any){
    let data = {
      cardTitle: card.cardTitle,
      cardsInHands: this.cardsInHands.filter(c=>c.id!=card.id),
      players: this.players.filter(p=>p.login!=localStorage.getItem('myLogin')),
      chooseTarget: ['Огнемет','Топор','Подозрение','Меняемся местами!','Сматывай уточки!', 'Соблазн','Заколоченная дверь'].includes(card.cardTitle),
      chooseCard: ['Соблазн','Свидание вслепую'].includes(card.cardTitle),
      card: card
    }
    const cardFromHeadDialogRef = this.dialog.open(CardsInHandsComponent, {data:data});
    cardFromHeadDialogRef.afterClosed().subscribe(v=>{
      if(v){
        this.getGameInfo();
      }
    })
  }

  //TODO Показать карты сыгранные на вас: (v.RESULTS[5][парам.][]), где парам.="Номер_карты_сыгранной_на_вас_карты" или "Название_сыгранной_на_вас_карты" или "Описание_сыгранной_на_вас_карты"
  //TODO Если в эффектах () приходят карты разыгравшего Виски то нужно показывать эти карты
  //TODO Если выставили дверь (v.RESULTS[7]['Заколоченные_двери'][index]) нужно просто их показать без варианта что-либо сделать
  //TODO Виски (v.RESULTS[8][])
  getGameInfo(){
    this.players = []
    this.cardsInHands = []
    this.userToken = localStorage.getItem('userToken');
    this.currentRoomCode = localStorage.getItem('gameRoomChosen');

    this.rout = 'game-table';
    localStorage.setItem('rout', '')

    this.api.updateGame(this.userToken, this.currentRoomCode).subscribe(v => {
      this.temporaryMessInfo = v.RESULTS;
      localStorage.setItem('temporaryMessInfo', JSON.stringify(v.RESULTS));
      this.message=v.RESULTS[1]['update_message'][0]

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
          case 'Сматывай удочки!' : cardInf.cardImg="url('assets/Cards/55_reel_fishing_rods.png')"
            break;
        }
        cardInf.cardNumber = data;
        cardInf.cardDescription = cards['Описание_ваших_карт'][index];
        cardInf.cardTitle = cards['Названия_ваших_карт'][index];
        cardInf.cardType = cards['Тип карты'][index];
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
    });

  }


}
