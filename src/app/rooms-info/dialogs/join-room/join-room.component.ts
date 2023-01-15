import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {

  roomNumberFC = new FormControl('',[Validators.required]);
  typedPasswordFC = new FormControl('');
  roomNumberChosen: any;
  userToken: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private api:ApiService, private router: Router) {
    this.roomNumberChosen=data.roomNumber;
    this.roomNumberFC.setValue(this.roomNumberChosen)
    this.userToken=localStorage.getItem('userToken');
  }

  onSubmit(){
    if(this.roomNumberFC.valid){
      let invokerData = {
        userToken: this.userToken || '',
        roomNumber: this.roomNumberFC.value || '',
        // password: this.typedPasswordFC.value || '',
      }
      console.log(invokerData.roomNumber);
      console.log(invokerData.userToken);
      this.api.updateGame(invokerData.userToken,invokerData.roomNumber)
        .subscribe(v=> {
          this.router.navigate(['gameTable']);
        },error => {
          alert('Упс! Простите, что-то пошло не так')
        })
    }
  }

}
