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
  userLogin: any;
  currentRoomCode: any;
  temporaryMessInfo: any;
  dataSource: any[] = [];
  cardsPersist: any[] = []
  whiskeyCards: any[] = [];
  rout: any;
  cardsInHands: any[] = [];
  players: any[] = [];
  timer: any;
  role:any;
  currentMover:any;
  message: any;

  effectOnMe: any;

  lockedDoor: any;
  lockedDoorLogin: any;

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

  applyEffect(){
    this.api.passEffect(this.userToken,this.currentRoomCode,this.effectOnMe.id).subscribe(value => {

    })
  }

  pickCard(card: any){
    let data = {
      cardTitle: card.cardTitle,
      cardsInHands: this.cardsInHands.filter(c=>c.id!=card.id),
      players: this.players.filter(p=>p.login!=localStorage.getItem('myLogin')),
      chooseTarget: ['Огнемет','Топор','Подозрение','Меняемся местами!','Сматывай удочки!', 'Соблазн','Заколоченная дверь'].includes(card.cardTitle),
      chooseCard: ['Соблазн','Свидание вслепую'].includes(card.cardTitle),
      card: card
    }
    const cardFromHeadDialogRef = this.dialog.open(CardsInHandsComponent, {data:data});
    cardFromHeadDialogRef.afterClosed().subscribe(v=>{
      if(v){
        this.getGameInfo();
        if (v.length)
          this.cardsPersist = v;
      }
    })
  }

  getGameInfo(){

    // this.players = [];
    //this.cardsInHands = [];
    this.userToken = localStorage.getItem('userToken');
    this.currentRoomCode = localStorage.getItem('gameRoomChosen');
    this.lockedDoor='';
    this.userLogin=localStorage.getItem('myLogin');
    this.rout = 'game-table';
    localStorage.setItem('rout', '');

    this.api.updateGame(this.userToken, this.currentRoomCode).subscribe(v => {
      this.temporaryMessInfo = v.RESULTS;
      localStorage.setItem('temporaryMessInfo', JSON.stringify(v.RESULTS));
      if(!v.RESULTS[1]?.update_message){
        this.message=v.RESULTS[0]['update_message'][0]
      } else {
        this.message=v.RESULTS[1]['update_message'][0]
      }

      if (this.temporaryMessInfo[7] && this.temporaryMessInfo[7]['Заколоченные_двери'] && this.temporaryMessInfo[7]['Заколоченные_двери'][0])
          this.lockedDoor = this.temporaryMessInfo[7]['Заколоченные_двери'][0];
      else
        this.lockedDoor = ''

      let cards = this.temporaryMessInfo[4]
      let newCards: any[] = [];

      cards['Номер_ваших_карт'].forEach((data: any, index: any) => {
        let cardInf: any = {};
        cardInf.cardImg=this.getImageOfCard(cards['Названия_ваших_карт'][index]);

        cardInf.cardNumber = data;
        cardInf.cardDescription = cards['Описание_ваших_карт'][index];
        cardInf.cardTitle = cards['Названия_ваших_карт'][index];
        cardInf.cardType = cards['Тип карты'][index];
        newCards.push(cardInf);
        if(!this.cardsInHands.some(cih => cih.cardNumber==cardInf.cardNumber))
          this.cardsInHands.push(cardInf);
      });
      let cardsInHandsCopy: any[] = this.cardsInHands.slice();

      cardsInHandsCopy.forEach((card:any, index:number) =>{
        if (!newCards.some(c => c.cardNumber==card.cardNumber))
            this.cardsInHands.splice(index,1);
      })


      let whiskeyCards= this.temporaryMessInfo[8]['Названия_карт_сыгравшего_виски'];
      if(whiskeyCards!=undefined){
        whiskeyCards.forEach((data: any, index: any) => {
          let whisCardInf: any = {};
          whisCardInf.cardName = data
          whisCardInf.cardImg = this.getImageOfCard(whiskeyCards['Названия_карт_сыгравшего_виски'][index])
          this.whiskeyCards.push(whisCardInf);
        })
      }
      let players = this.temporaryMessInfo[2];
    if (!this.players.length) {
      players['Номер_в_порядке_хода'].forEach((data: any, index: any) => {
        let playerInf: any = {};
        playerInf.orderNumber = data;
        playerInf.login = players['Логин'][index];
        playerInf.id = players['Номер_игрока'][index];

        if (playerInf.id == this.lockedDoor)
          this.lockedDoorLogin = playerInf.login


        if (players['Чей_ход'][index]) {
          this.currentMover = players['Логин'][index];
        }
        this.players.push(playerInf);
      });
    } else{
        players['Логин'].forEach((data: any, index: any) => {
          let player = this.players.find(p=>p.login==data)
          if (!player) return;
          player.orderNumber = players['Номер_в_порядке_хода'][index];

        if (players['Номер_игрока'][index] == this.lockedDoor)
            this.lockedDoorLogin = data
        if (players['Чей_ход'][index]) {
          this.currentMover = data;
        }
      });
    }
      this.players.sort((a:any,b:any)=>a .orderNumber-b.orderNumber);
      this.effectOnMe= {};
      this.effectOnMe = this.temporaryMessInfo[5]['Название_сыгранной_на_вас_карты'][0];
      this.timer=this.temporaryMessInfo[0]['Осталось_до_конца_хода_в_сек'][0];
      this.role=this.temporaryMessInfo[3]['Ваша_Роль'][0];
    });

  }

  getImageOfCard(title: string){
    switch (title) {
      case 'Нечто': return "url('assets/Cards/1_the_thing.png')";
      case 'Заражение!': return "url('assets/Cards/5_infection.png')"
      case 'Подозрение' : return "url('assets/Cards/32_suspend.png')"
      case 'Огнемет': return "url('assets/Cards/22_flame_thrower.png')"
      case 'Топор': return "url('assets/Cards/30_axe.png')"
      case 'Виски' : return "url('assets/Cards/40_whiskey.png')"
      case 'Упорство': return "url('assets/Cards/43_pirsistance.png')"
      case 'Гляди по сторонам' : return "url('assets/Cards/48_watch_out.png')"
      case 'Мне и здесь неплохо': return  "url('assets/Cards/71_im_chillin.png')"
      case 'Нет уж, спасибо!': return "url('assets/Cards/74_no_thanks.png')"
      case 'Мимо!' : return "url('assets/Cards/78_miss.png')"
      case 'Заколоченная дверь': return "url('assets/Cards/86_close_door.png')"
      case '...три, четыре...' : return "url('assets/Cards/94_three_four.png')"
      case 'Меняемся местами!' : return "url('assets/Cards/50_change_places.png')"
      case 'Забывчивость': return  "url('assets/Cards/98_forget.png')"
      case 'Цепная реакция': return "url('assets/Cards/98_forget.png')"
      case 'Соблазн' : return "url('assets/Cards/61_seduce.png')"
      case 'Никакого шашлыка!' : return "url('assets/Cards/81_not_burning.png')"
      case 'Сматывай удочки!' : return "url('assets/Cards/55_reel_fishing_rods.png')"
      case 'Свидание вслепую!' : return "url('assets/Cards/98_forget.png')"
    }
    return '';
  }

  pushNewElements(){

  }

  trunc(number: number) {
    return Math.trunc(number)
  }

  selectedCard: any
  getCard() {
    this.api.getCard(this.userToken, this.currentRoomCode, this.selectedCard).subscribe()
  }
}
