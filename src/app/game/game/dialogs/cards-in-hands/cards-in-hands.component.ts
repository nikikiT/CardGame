import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {HelperService} from "../../../../../services/helper.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-cards-in-hands',
  templateUrl: './cards-in-hands.component.html',
  styleUrls: ['./cards-in-hands.component.css']
})
export class CardsInHandsComponent implements OnInit{

  cardTitle: any;
  players: any[] = []
  cardsInHands: any[] = []
  chooseTarget = false;
  chooseCard = false;

  currentRoomNumber: any;
  userToken: any;
  openAdditionalMenu = false
  selectedTarget: string = '';
  selectedCard: number = 0;
  card: any = {};
  error_msg: any;
  suspendCard: any = null
  persistenceCards: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private router: Router,
    public helper: HelperService,
    public dialogRef: MatDialogRef<CardsInHandsComponent>,

  ) {
    this.cardTitle=data.cardTitle;
    this.players=data.players;
    this.cardsInHands=data.cardsInHands;
    this.chooseCard = data.chooseCard
    this.chooseTarget = data.chooseTarget
    this.card = data.card
    this.userToken=localStorage.getItem('userToken');
    this.currentRoomNumber=localStorage.getItem('gameRoomChosen');
  }

  ngOnInit(): void {

  }

  toDrop(){ //Выполнить сброс карты с руки
    this.api.dropCard(this.userToken,this.currentRoomNumber,this.card.cardNumber).subscribe( v => {
      if (v.RESULTS[0].err_msg) {
        this.error_msg = v.RESULTS[0].err_msg[0];
        this.dialogRef.close();
        alert(this.error_msg);
        return;
      }


    }, error => {
      alert(error)
    });
  }

  toChange(){ //Выполнить обмен картами которые есть в руках
    console.log("Токен: "+this.userToken,"№ комн: "+this.currentRoomNumber,"ид карты: "+this.card.cardNumber)
    this.api.changeCards(this.userToken,this.currentRoomNumber,this.card.cardNumber).subscribe(v=>{
      if (v.RESULTS[0].err_msg) {
        this.error_msg = v.RESULTS[0].err_msg[0];
        alert(this.error_msg);
        this.dialogRef.close();
        return;
      }

        console.log(v.RESULTS)
    }, error => {
      alert(error)
    });
  }

  toDefend(){ //Защититься от эффекта противника
    this.api.defend(this.userToken,this.currentRoomNumber,this.card.cardNumber).subscribe(v=>{
      if (v.RESULTS[0].err_msg) {
        this.error_msg = v.RESULTS[0].err_msg[0];
        alert(this.error_msg);
        this.dialogRef.close();
        return;
      }
    }, error => {
      alert(error)
    })
  }

  //TODO Упорство возвращает 3 карты на выбор и из них нужно выбрать одну одну
  //TODO Подозрение возвращает 1 карту (подсмотреть) и больше ничего с ней не делает

  toPlay() { //Выполнить розыгрыш карт в руке
    console.log("Токен: "+this.userToken,"№ комн: "+this.currentRoomNumber,"ид карты: "+this.card.cardNumber, "логин цели: "+this.selectedTarget,"доп. карта: "+this.selectedCard.toString())
    this.api.playCard(this.userToken,this.currentRoomNumber,this.card.cardNumber,this.selectedTarget,this.selectedCard.toString()).subscribe(v=>{
      if (v.RESULTS[0].err_msg) {
        this.error_msg = v.RESULTS[0].err_msg[0];
        alert(this.error_msg);
        this.dialogRef.close();
        return;
      }

      if (v.RESULTS[0].Suspend)
        this.suspendCard = {
          title:v.RESULTS[1].title[0],
          id: v.RESULTS[1].id[0],
        }

      if(v.RESULTS[0].persist){
        let persistCards = v.RESULTS[1]
        persistCards['Название'].forEach((data:any, index:any)=>{
          let cardInfo = {
            title: data,
            id: persistCards['Номер карты'][index],
            description: persistCards['Описание'][index]
          }
          this.persistenceCards.push(cardInfo)
        })
      }


    }, error => {
      alert(error)
    })

    this.openAdditionalMenu=false
  }

  selectPersistCard(card: any) {
    this.api.getCard(this.userToken, this.currentRoomNumber,card.id).subscribe(() => this.dialogRef.close())
  }
}
