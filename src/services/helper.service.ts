import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

   getImagePathByURL(){
    switch (window.location.pathname){
      case '/login':
      case '/register': return "url('assets/backgrounds/background_start.jpg')"
      case '/games-hub': return "url('assets/backgrounds/back_game_4.png')"
      case '/game-table': return "url('assets/backgrounds/back_game_1.png')"
    }
    return  ''
  }

}
