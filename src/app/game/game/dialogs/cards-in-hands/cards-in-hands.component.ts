import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {HelperService} from "../../../../../services/helper.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


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

  openAdditionalMenu = false
  selectedTarget: string = '';
  selectedCard: number = 0;
  card: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private router: Router,
    public helper: HelperService

  ) {
    this.cardTitle=data.cardTitle;
    this.players=data.players;
    this.cardsInHands=data.cardsInHands;
    this.chooseCard = data.chooseCard
    this.chooseTarget = data.chooseTarget
    this.card = data.card
  }

  ngOnInit(): void {

  }

  toDrop(){ //Выполнить сброс карты с руки

  }

  toChange(){ //Выполнить обмен картами которые есть в руках

  }

  toDefend(){ //Защититься от эффекта противника

  }

  toPlay() { //Выполнить розыгрыш карт в руке



    this.openAdditionalMenu=false
  }
}
