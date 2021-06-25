import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {

  friendRequests: Array<User> = [];
  allusers: Array<User> = [];
  _user: User = new User();
  
  constructor(private zone: NgZone,private authenticationService: AuthenticationService, private userService:UserService) { }

  ngOnInit(): void {
    this.returnFriendRequests()
  }



  returnFriendRequests(){
    
    this.userService.findAll().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.allusers = res;
        for(let i = 0;i<this.allusers.length;i++){
          for(let j = 0;j<this.allusers[i].pendingFriends.length;j++){
            if(this.authenticationService.getLoggedInUserName() == this.allusers[i].pendingFriends[j]){

              this.userService.getUsers(this.allusers[i].username).subscribe(res => {
                this.zone.run(() => {
                  this._user = res;
                  this.friendRequests.push(this._user);

                  })
                });
              
            }
          }
        }
      });
    });
  }



}
