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
      case '/games-hub': return "url('assets/backgrounds/back_game_3.png')"
      case '/game-table': return "url('assets/backgrounds/back_game_1.png')"
    }
    return  ''
  }

  getImageOfCard(title: string){
    switch (title) {
      case 'Нечто': return "url('assets/Cards/1_the_thing.png')";
      case 'Заражение!': return "url('assets/Cards/5_infection.png')"
      case 'Подозрение' : return "url('assets/Cards/32_suspend.png')"
      case 'Огнемет': return "url('assets/Cards/22_flame_thrower.png')"
      case 'Топор': return "url('assets/Cards/30_axe.png')"
      case 'Виски' : return "url('assets/Cards/40_whiskey.png')"
      case 'Упорство': return "url('assets/Cards/43_pirsistance.png')"
      case 'Гляди по сторонам' : return "url('assets/Cards/48_watch_out.png')"
      case 'Мне и здесь неплохо': return  "url('assets/Cards/71_im_chillin.png')"
      case 'Нет уж, спасибо!': return "url('assets/Cards/74_no_thanks.png')"
      case 'Мимо!' : return "url('assets/Cards/78_miss.png')"
      case 'Заколоченная дверь': return "url('assets/Cards/86_close_door.png')"
      case '...три, четыре...' : return "url('assets/Cards/94_three_four.png')"
      case 'Меняемся местами!' : return "url('assets/Cards/50_change_places.png')"
      case 'Забывчивость': return  "url('assets/Cards/98_forget.png')"
      case 'Цепная реакция': return "url('assets/Cards/98_forget.png')"
      case 'Соблазн' : return "url('assets/Cards/61_seduce.png')"
      case 'Никакого шашлыка!' : return "url('assets/Cards/81_not_burning.png')"
      case 'Сматывай удочки!' : return "url('assets/Cards/55_reel_fishing_rods.png')"
      case 'Свидание вслепую' : return "url('assets/Cards/104_blind_date.png')"
    }
    return '';
  }

}

