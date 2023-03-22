import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./homepage/homepage.component";
import {GameComponent} from "./game/game.component";
import {LoginComponent} from "./login/login.component";
import {ScoresComponent} from "./scores/scores.component";
import {RegisterComponent} from "./register/register.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  { path: 'start', component: HomepageComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'game', component: GameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: '**', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
