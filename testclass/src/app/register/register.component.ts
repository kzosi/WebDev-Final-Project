import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import { HttpService } from '../http-service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  password = '';
  repPassword = '';
  email = '';
  username = '';
  jsonText = '';

  constructor(private httpService: HttpService) { }

  checkPassword(){
    if(this.password != this.repPassword){
      alert("password and repeated password don't match");
    }else{
      this.addUser();
    }

  }

  checkUser(){
    this.httpService.checkUser(this.username)
      .subscribe(
        (response) => {alert('username to indicate already exists');},
        (error: HttpErrorResponse) => { this.responseProcessErrorChecking(error); });
  }

  addUser() {

    this.httpService.postUser(this.username, this.email,this.password)
      .subscribe(
        (response) => { this.addUserProcess(response); },
        (error: HttpErrorResponse) => { this.responseProcessErrorPosting(error); });
  }

  addUserProcess(response: any) {
    alert('you have created an account');
  }

  responseProcessErrorPosting (error: HttpErrorResponse) {
    if (error.status == 400){
      alert('no username or email or password');
    }

    if (error.status == 409){
      alert('duplicated user name');
    }

    if (error.status == 500){
      alert('internal server error');
    }
  }

  responseProcessErrorChecking (error: HttpErrorResponse) {
    if (error.status == 200){
      alert('username to indicate already exists');
    }

    if (error.status == 404){
      //alert('you may create an account');
    }

    if (error.status == 500){
      alert('internal server error');
    }
  }

  ngOnInit(): void {
  }

}
