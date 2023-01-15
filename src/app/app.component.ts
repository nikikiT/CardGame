import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CardGame';


  constructor(private api: ApiService, private router: Router) {
  }


  ngOnInit() {
    this.router.navigate([localStorage.getItem('rout')]);
  }
}
