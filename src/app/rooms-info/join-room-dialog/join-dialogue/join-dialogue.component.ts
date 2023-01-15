import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  // selector: 'child-component',
  selector: 'app-join-dialogue',
  templateUrl: './join-dialogue.component.html',
  styleUrls: ['./join-dialogue.component.css']
})
export class JoinDialogueComponent {


  roomNumberFC = new FormControl('',[Validators.required]);
  typedPasswordFC = new FormControl('');
  roomNumberChosen: any;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.roomNumberChosen=data.roomNumber;
    this.roomNumberFC.setValue(this.roomNumberChosen)
  }

  //checkJoinRoom(any: ){}


}
