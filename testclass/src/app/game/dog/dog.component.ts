import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class UfoComponent implements AfterViewInit {
  @Output() ufoData = new EventEmitter();
  @Input() hit:boolean=false;
  @ViewChild('ufo') ufo!: ElementRef;
  limiteD = window.innerWidth;
  hpos = 10;
  ufoWidth = 60;
  hstep = 3;
  myimgsrc = '../assets/imgs/nero0.png';

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.ufo.nativeElement, 'left',  this.hpos + 'px');
    this.renderer.setStyle(this.ufo.nativeElement, 'width', this.ufoWidth + 'px');
    window.setInterval(() => { this.move(); } , 25);
    window.onresize = () => {this.limiteD = window.innerWidth; };
  }

  changeHitDog(){
    this.myimgsrc = '../assets/imgs/explosion.gif';
    window.setTimeout( () => {this.myimgsrc =  '../assets/imgs/nero0.png'}, 700);
  }

  move() {
    if ((this.hpos > this.limiteD - this.ufoWidth - 8) || (this.hpos) < 0) {
      this.hstep = (-1) * this.hstep;
    }
    this.hpos = this.hpos + this.hstep;
    this.renderer.setStyle(this.ufo.nativeElement, 'left', this.hpos + 'px');
    this.sendData();
    if(this.hit){
      this.changeHitDog()
    }
    this.hit = false;
  }

  sendData(){
    //console.log(this.ufo.nativeElement.style)
    let Data = {
      horizontal: this.hpos};
    this.ufoData.emit(Data);
  }


}



