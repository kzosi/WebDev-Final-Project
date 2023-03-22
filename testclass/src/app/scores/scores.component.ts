import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpService} from "../http-service/http.service";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  currentUser = ''
  userlogged = false;

  Users: string[] = [];
  Points: string[] = [];
  Dogs: string[] = [];
  Seconds: string[] = [];
  Date: string[] = [];

  LoggedUsers: string[] = [];
  LoggedPoints: string[] = [];
  LoggedDogs: string[] = [];
  LoggedSeconds: string[] = [];
  LoggedDate: string[] = [];

  jsonText = "";

  constructor(private httpService: HttpService) { }

  readScores(){
    this.httpService.getRecords()
      .subscribe(
        (response) => { this.setScoresTable(response); },
        (error: HttpErrorResponse) => { this.processReadScoresResponse(error); });
  }

  setScoresTable(response: any){
    this.jsonText = response;
    let i = 0
    for (const row of response) {
      console.log(row)
      this.Users[i] = row.username;
      this.Points[i] = row.punctuation;
      this.Dogs[i] = row.ufos;
      this.Seconds[i] = row.disposedTime;
      this.Date[i] = (new Date(row.recordDate)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
      i++;
    }
  }

  readUserScores(){
      this.httpService.getUserRecord('user1')
        .subscribe(
          (response) => { this.setUserScoresTable(response); },
          (error: HttpErrorResponse) => { this.processReadScoresResponse(error); });

  }

  setUserScoresTable(response: any) {
    this.jsonText = response;
    let i = 0
    for (const row of response) {
      console.log(row)
      this.LoggedUsers[i] = row.username;
      this.LoggedPoints[i] = row.punctuation;
      this.LoggedDogs[i] = row.ufos;
      this.LoggedSeconds[i] = row.disposedTime;
      this.LoggedDate[i] = (new Date(row.recordDate)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
      i++;
    }

  }

  processReadScoresResponse(error: HttpErrorResponse){
    if (error.status == 401){
      alert('no valid token');
    }

    else if (error.status == 500){
      alert('internal server error');
    }
  }


  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.userlogged = true;
      this.readUserScores()
    }
    this.readScores()

  }

}
