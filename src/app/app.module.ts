import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
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


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    //outlet: 'popup'
  },

  {
    path: 'register',
    component: RegisterComponent,
    //outlet: 'popup'
  },

  {
    path: 'gamesHub',
    component: RoomsInfoComponent,
  },

  {
    path: 'gameTable',
    component: GameComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoomsInfoComponent,
    GameComponent
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
        MatCardModule
    ],
  providers: [HttpClient, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
