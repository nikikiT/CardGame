import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  userToken: any;
  roundDurationFC = new FormControl('',[]);
  newRoomPassword = new FormControl('',[]);
  durationTime: any;
  roomPassword: any;
  errorMsg = null;

  constructor(private api: ApiService) {
  }


  onSubmit(){
    let newRoomData = {
      duration: this.durationTime || '',
      password: this.roomPassword || '',
    }
    this.userToken=JSON.parse(localStorage.getItem('userToken')|| '');
    this.api.newRoom(this.userToken,newRoomData.duration,newRoomData.password)
      .subscribe( v =>{
        if(v.RESULTS[0].rus_error){
          this.errorMsg=v.RESULTS[0].rus_error[0];
          alert(this.errorMsg);
          return;
        }

      });

  }


}
