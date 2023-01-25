import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {
  roomNumberFC = new FormControl('', [Validators.required])
  userToken: any;
  roomNumberChosen: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private api:ApiService,
               private router: Router,
               public dialogRef: MatDialogRef<StartGameComponent>,

  )
  {
    this.roomNumberChosen=data.roomNumber;
    this.roomNumberFC.setValue(this.roomNumberChosen)
    this.userToken=localStorage.getItem('userToken');
  }

  onSubmit(){
    if (this.roomNumberFC.valid){


    }

    this.api.startGame(this.userToken,this.roomNumberFC.value || '').subscribe(v=>{
      this.api.updateInfo(this.userToken).subscribe((r:any) =>{
        localStorage.setItem('messOfInfoResponse',JSON.stringify(r.RESULTS));
        this.dialogRef.close(true);
      });

    }, error => {
      alert('Упс! Простите, что-то пошло не так с началом игры')
      });

  }

}
