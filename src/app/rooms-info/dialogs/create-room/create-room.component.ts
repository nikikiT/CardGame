import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  userToken: any;
  roundDurationFC = new FormControl('', []);
  newRoomPassword = new FormControl('', []);
  durationTime = 120;
  roomPassword: any;
  errorMsg = null;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private api: ApiService,
              public dialogRef: MatDialogRef<CreateRoomComponent>
  )

  {
  }


  onSubmit() {
    this.roomPassword=this.newRoomPassword.value;
    console.log(this.roomPassword)
    let newRoomData: any = {
      duration: this.durationTime || 0,
      password: this.roomPassword || '',
    }
    this.userToken = JSON.parse(localStorage.getItem('userToken') || '');
    this.api.newRoom(this.userToken, newRoomData)
      .subscribe(v => {
        if (v.RESULTS[0].rus_error) {
          this.errorMsg = v.RESULTS[0].rus_error[0];
          alert(this.errorMsg);
          return;
        }
        this.api.updateInfo(this.userToken).subscribe((r:any)=>{
          localStorage.setItem('messOfInfoResponse',JSON.stringify(r.RESULTS));
          this.dialogRef.close(true);
        });
      }, error => {
        alert('Упс! Простите, что-то пошло не так');
      });

  }


}
