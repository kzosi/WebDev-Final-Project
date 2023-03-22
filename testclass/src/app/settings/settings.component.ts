import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  numberOfDogs = "";
  seconds = "";

  setLocalStorage(){
    this.numberOfDogs = (document.getElementById("HowManyDogs") as HTMLInputElement).value;
    this.seconds = (document.getElementById("HowMuchTime") as HTMLInputElement).value;

    localStorage.setItem('Change', '1');
    localStorage.setItem('secs', this.seconds);
    localStorage.setItem('dogs', this.numberOfDogs);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
