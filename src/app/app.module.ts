import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import { RegisterComponent } from './register/register.component';
import { RoomsInfoComponent } from './rooms-info/rooms-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { GameComponent } from './game/game/game.component';
import {MatCardModule} from "@angular/material/card";
import { JoinGameComponent } from './rooms-info/dialogs/join-game/join-game.component';
import {MatDialogModule} from "@angular/material/dialog";
import { JoinRoomComponent } from './rooms-info/dialogs/join-room/join-room.component';
import { CreateRoomComponent } from './rooms-info/dialogs/create-room/create-room.component';
import {MatSliderModule} from "@angular/material/slider";
import {HelperService} from "../services/helper.service";
import { StartGameComponent } from './rooms-info/dialogs/start-game/start-game.component';
import { CardsInHandsComponent } from './game/game/dialogs/cards-in-hands/cards-in-hands.component';
import { EffectComponent } from './game/game/dialogs/effect/effect.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";



const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },

  {
    path: 'register',
    component: RegisterComponent,

  },

  {
    path: 'games-hub',
    component: RoomsInfoComponent,
  },

  {
    path: 'game-table',
    component: GameComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoomsInfoComponent,
    GameComponent,
    JoinGameComponent,
    JoinRoomComponent,
    CreateRoomComponent,
    StartGameComponent,
    CardsInHandsComponent,
    EffectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatSliderModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [HttpClient, LoginComponent, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
