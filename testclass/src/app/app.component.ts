import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logged = false;

  logOut(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      this.logged = false;
    }
    else{
      this.logged = true;
    }
  }
}
