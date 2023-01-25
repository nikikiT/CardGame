import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {HelperService} from "../services/helper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CardGame';


  constructor(private api: ApiService, private router: Router, private helper: HelperService) {
  }


  ngOnInit() {
    this.router.navigate([localStorage.getItem('rout')]).then(
      ()=>document.body.style.backgroundImage = this.helper.getImagePathByURL());
  }
}
