import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-friends-pop-up',
  templateUrl: './friends-pop-up.component.html',
  styleUrls: ['./friends-pop-up.component.css']
})
export class FriendsPopUpComponent implements OnInit {


  @Input() displayPopUp: boolean = false;
  @Input() users: User = new User();
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
