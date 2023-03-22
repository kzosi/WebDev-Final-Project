import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jsonText = "";
  username = '';
  password = '';

  httpRequest() {
    this.httpService.login(this.username, this.password)
      .subscribe(
        (response) => { this.responseProcess(response); },
        (error: HttpErrorResponse) => { this.responseProcessError(error); });
  }

  responseProcess(response: any) {
      this.jsonText = response;
      localStorage.setItem('token', this.jsonText);
      window.location.reload();
  }


  responseProcessError (error: HttpErrorResponse) {
    if (error.status == 401){
      alert('invalid username/password supplied');
    }

    else if (error.status == 401){
      alert('no username or password');
    }

    else if (error.status == 500){
      alert('internal server error');
    }
  }

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

}

