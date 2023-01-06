import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CardGame';


  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.signIn('nikitoxic','123456')
      .subscribe(v=> {

      },error => {

      })
  }
}
