import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() displayPopUp: boolean = false;
  @Input() mapurl:string = '';
  @Output() callParent = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  
  removePopUp(){
    this.displayPopUp = false;
    console.log("---BBBB:" + this.displayPopUp);
    this.msgToParent();

    //console.log("UN jam ktu: "+ users.name);
    
    
  }

msgToParent() {this.callParent.emit(this.displayPopUp);}

}
