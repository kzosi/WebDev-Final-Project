import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpService} from "../http-service/http.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  //game variables
  seconds = 60;
  secondsLeft = 60;
  score = 0;
  dogs = 1;
  hit = false;
  playtime = true;
  logged = false;

  //missile variables
  misVertical= 0; //bottom
  misHorizontal = 0; //left
  misHeight = 0; //height

  //ufo variables
  ufoVertical= 450;
  ufoHorizontal = 0;
  ufoWidth = 60;
  constructor(private httpService: HttpService) { }

  interval: any;

  getMissileInfo(Data:any){
    this.misVertical = Data.vertical;
    this.misHorizontal = Data.horizontal;
    this.misHeight = Data.height;
    this.checkForHit();
  }

  getUfoInfo(Data:any) {
    this.ufoHorizontal = Data.horizontal;
  }

  checkForHit(){
    let hitt:boolean = false;
    hitt = ((this.misVertical + this.misHeight >= this.ufoVertical )&&
      (this.misHorizontal >=  this.ufoHorizontal) &&
      (this.misHorizontal <=  this.ufoHorizontal + this.ufoWidth));

    if(hitt == true) {
      this.hit = true;
      this.score += 100;
    }
  }

  failedAttempt(){
    this.score -= 25;
  }

  successfulAttempt(){
    this.hit = false;
  }

  startTimer(){
    this.interval = setInterval(() => {
      if(this.secondsLeft > 0) {
        this.secondsLeft--;
      } else {
        clearInterval(this.interval);
        this.playtime = false;
        this.countFinalScore();
      }
    },1000)
  }

  countFinalScore(){
    if(this.seconds == 120){
      this.score = this.score / 2;

    } else if(this.seconds == 180){
      this.score = this.score / 3;
    }
    this.score = this.score - 50 * (this.dogs - 1);
  }

  saveScore(){
      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      this.httpService.postRecord(this.score, this.dogs, this.seconds)
        .subscribe(
          (response) => {
            alert('your score has been saved');
          },
          (error: HttpErrorResponse) => {
            this.responseProcessError(error);
          });


  }

  responseProcessError (error: HttpErrorResponse) {
    if (error.status == 400){
      alert('missing parameter');
    }

    else if (error.status == 401){
      alert('no valid token');
    }

    else if (error.status == 500){
      alert('internal server error');
    }
  }


  ngOnInit(): void {
    this.startTimer();
    if(localStorage.getItem('token') != null){
      this.logged = true;
    }
    const secs: any = localStorage.getItem('secs')
    if (secs !== null) {
      //this.seconds = parseInt(secs);
      this.seconds = parseInt(secs);
      this.secondsLeft = parseInt(secs);
    }else{
      this.seconds = 60;
      this.secondsLeft = 60;
    }
  }





}
