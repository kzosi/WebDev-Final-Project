import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private url = 'http://wd.etsisi.upm.es:10000/';

  constructor(private http: HttpClient) { }

  // methods for user managing
  login(usr: String, pass: String) {
    let urlLogin = this.url + 'users/login?username=' + usr + '&password='+ pass;

    return this.http.get(urlLogin);
  }

  checkUser(username: String){
    let urlCheckUser= this.url + 'users/' + username;
    return this.http.get(urlCheckUser);
  }

  postUser(username: String,email: String,password: String){
    let urlPostUser= this.url + 'users';
    return this.http.post(urlPostUser,{username:username,email:email,password:password});
  }
  // methods for scores managing
  postRecord(punctuation: number, ufos: number, disposedTime:number){
    let urlPostRecord= this.url + 'records' ;
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token')??'');
    return this.http.post(urlPostRecord,{punctuation:punctuation,ufos:ufos,disposedTime:disposedTime},{headers});
  }

  getRecords(){
    let urlgetRecord= this.url + 'records/';
    return this.http.get(urlgetRecord);
  }

  getUserRecord(username: String){
    let urlGetUserRecord= this.url + 'records/' + username ;
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token')??'');
    return this.http.get(urlGetUserRecord,{headers});
  }
}



