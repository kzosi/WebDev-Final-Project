import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { ScoresComponent } from './scores/scores.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { MissileComponent } from './game/missile/missile.component';
import { UfoComponent } from './game/dog/dog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GameComponent,
    SettingsComponent,
    ScoresComponent,
    RegisterComponent,
    LoginComponent,
    MissileComponent,
    UfoComponent
  ],
    imports: [
        BrowserModule,
        RouterLinkWithHref,
        RouterLinkActive,
        RouterOutlet,
        FormsModule,
        AppRoutingModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
