import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";
import {JoinRoomComponent} from "../join-room/join-room.component";

@Component({
  // selector: 'child-component',
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent {


  roomNumberFC = new FormControl('',[Validators.required]);
  roomNumberChosen: any;
  userToken: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private api:ApiService,
               private router: Router,
               public dialogRef: MatDialogRef<JoinGameComponent>
               ) {
    this.roomNumberChosen=data.roomNumber;
    this.roomNumberFC.setValue(this.roomNumberChosen)
    this.userToken=localStorage.getItem('userToken');
  }

  onSubmit(){
    if(this.roomNumberFC.valid){
      let invokerData = {
        userToken: this.userToken || '',
        roomNumber: this.roomNumberFC.value || '',
      }
      localStorage.setItem('gameRoomChosen',this.roomNumberFC.value || '' );
      this.router.navigate(['game-table']);
      this.dialogRef.close();//Могу подать параметры которые получу в сабскрайб если вызвать афтер клоузд у диалог рефа в основ. комп.
      // this.api.updateGame(invokerData.userToken,invokerData.roomNumber)
      //   .subscribe(v=> {
      //     this.dialogRef.close(true);
      //     localStorage.setItem('rout','')
      //     this.router.navigate(['game-table']);
      //   },error => {
      //     alert('Упс! Простите, что-то пошло не так')
      //   })
    }
  }

}
