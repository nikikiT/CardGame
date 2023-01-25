import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private api:ApiService,
               private router: Router,
               public dialogRef: MatDialogRef<JoinRoomComponent>,

  )

  {
    this.roomNumberChosen=data.roomNumber;
    this.roomNumberFC.setValue(this.roomNumberChosen)
    this.userToken=localStorage.getItem('userToken');
  }

  onSubmit(){
    if(this.roomNumberFC.valid){
      let invokerData = {
        userToken: this.userToken || '',
        roomNumber: this.roomNumberFC.value || '',
        password: this.typedPasswordFC.value || '',
      }
      this.api.joinRoom(invokerData.userToken,invokerData.roomNumber,invokerData.password)
        .subscribe((v: any)=> {
          this.api.updateInfo(this.userToken).subscribe((r:any)=>{
            localStorage.setItem('messOfInfoResponse',JSON.stringify(r.RESULTS));
            //console.log(r.RESULTS);
            this.dialogRef.close(true);
          });
        },error => {
          alert('Упс! Простите, что-то пошло не так с присоединением к комнате')
        })
    }
  }

}
