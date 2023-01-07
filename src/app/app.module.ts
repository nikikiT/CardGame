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
    path: 'home',
    component: RoomsInfoComponent,
  },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoomsInfoComponent
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
    MatTableModule
  ],
  providers: [HttpClient, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
