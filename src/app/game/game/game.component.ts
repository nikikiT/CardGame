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
  whiskeyCardLogin: any;

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
        this.subscription?.unsubscribe()
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
      cardsInHands: this.cardsInHands.filter(c=>c.cardNumber!=card.cardNumber),
      players: this.players.filter(p=>p.login!=localStorage.getItem('myLogin')),
      chooseTarget: ['Огнемет','Топор','Подозрение','Меняемся местами!','Сматывай удочки!', 'Соблазн','Заколоченная дверь'].includes(card.cardTitle),
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

  getGameInfo(){
    this.userToken = localStorage.getItem('userToken');
    this.currentRoomCode = localStorage.getItem('gameRoomChosen');
    this.lockedDoor='';
    this.userLogin=localStorage.getItem('myLogin');
    this.rout = 'game-table';
    localStorage.setItem('rout', '');

    this.api.updateGame(this.userToken, this.currentRoomCode).subscribe(v => {
      this.temporaryMessInfo = v.RESULTS;

      if (v.ERROR != undefined)
        console.log(v.ERROR);

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
        cardInf.cardImg=this.helper.getImageOfCard(cards['Названия_ваших_карт'][index]);
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
      });

      let newWhiskey: any[] = [];
      let whiskeyCards= this.temporaryMessInfo[8];
      if (whiskeyCards['login'][0]==undefined)
        this.whiskeyCardLogin = '';

      if(whiskeyCards!=undefined){
        whiskeyCards['Названия_карт_сыгравшего_виски'].forEach((data: any, index: any) => {
          let whiskeyCardInf: any = {};
          whiskeyCardInf.cardName = data
          whiskeyCardInf.cardNumber = whiskeyCards['Номер_карт_сыгравшего_виски'][index];
          whiskeyCardInf.cardImg = this.helper.getImageOfCard(whiskeyCards['Названия_карт_сыгравшего_виски'][index])
          newWhiskey.push(whiskeyCardInf);
          if (!this.whiskeyCards.some(orc => orc.cardNumber==whiskeyCardInf.cardNumber))
            this.whiskeyCards.push(whiskeyCardInf);
        });
      }
      let whiskeyCopy: any[] = this.whiskeyCards.slice();
      whiskeyCopy.forEach((card:any, indexL:any) =>{
        if (!newWhiskey.some(w => w.cardNumber==card.cardNumber))
          this.whiskeyCards.splice(indexL,1);
      });



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

        this.effectOnMe= {
          title: this.temporaryMessInfo[5]['Название_сыгранной_на_вас_карты'][0],
          id: this.temporaryMessInfo[5]['Номер_сыгранной_на_вас_карты'][0]
        };

      this.timer=this.temporaryMessInfo[0]['Осталось_до_конца_хода_в_сек'][0];
      this.role=this.temporaryMessInfo[3]['Ваша_Роль'][0];
    });
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
