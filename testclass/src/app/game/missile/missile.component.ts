import {Component, OnInit, ViewChild, EventEmitter, Output,ElementRef, HostListener, Input} from '@angular/core';

@Component({
  selector: 'app-missile',
  templateUrl: './missile.component.html',
  styleUrls: ['./missile.component.css']
})
export class MissileComponent implements OnInit {
  @Input() stop:boolean=false;
  @Input() hit:boolean=false;
  @Output() missileData = new EventEmitter();
  @Output() Fail = new EventEmitter();
  @Output() Win = new EventEmitter();
  @ViewChild('missile') missile!: ElementRef;
  conf = {
    rLimit: window.innerWidth,
    uLimit: window.innerHeight
  };
  hpos = 300; hstep = 9;
  vpos = 0;   vstep = 9;
  pid = 0;    triggered = false;



  constructor() { }
  ngOnInit() {}

  @HostListener('document:keydown', ['$event'])
  keypressed(theEvent: KeyboardEvent) {
    if(this.triggered==false && this.stop == true) {
      switch (theEvent.key) {
        case 'ArrowRight':
          this.moveHorizontal(this.hstep);
          break;
        case 'ArrowLeft':
          this.moveHorizontal((-1) * this.hstep);
          break;
        case ' ':
          if (!this.triggered ) {
            this.triggered = true;
            this.pid = window.setInterval(() => {
              this.trigger();
            }, 15);
          }
          break;
      }
    }
  }



  moveHorizontal(step: any) {
    this.hpos = this.hpos + step;
    this.missile.nativeElement.style.left = this.hpos + 'px';
  }

  newMissile() {
    this.vpos = 0;
    this.missile.nativeElement.style.bottom = this.vpos + 'px';
    this.triggered = false;
  }

  trigger() {
    if(this.hit){
      clearInterval(this.pid);
      this.newMissile();
      this.Win.emit();
    }
    if (this.vpos > this.conf.uLimit) {
      clearInterval(this.pid);
      this.newMissile();
      this.Fail.emit();
    } else {
      this.vpos = this.vpos + this.vstep;
    }
    this.missile.nativeElement.style.bottom = this.vpos + 'px';
    this.sendData()
  }
  sendData(){
    let missileData = {
      vertical: this.vpos,
      horizontal: this.hpos,
      height: this.missile.nativeElement.offsetHeight};
    this.missileData.emit(missileData);
  }
}

