import { Component, Input, NgZone, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-friendsingle-element',
  templateUrl: './friendsingle-element.component.html',
  styleUrls: ['./friendsingle-element.component.css']
})
export class FriendsingleElementComponent implements OnInit {

  @Input() user:User = new User()
  @Input() isfriendrequestlist:boolean = false;
  userCompleteObject: User = new User();
  isFriendWithUser:boolean = false;
  sentRequest: boolean = false;
  loggedInUser: User = new User();
  constructor(private zone: NgZone,private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {

    console.log("-----:::: USERNAME:  "+ this.authenticationService.getLoggedInUserName());
    console.log("User to follow: "+ this.user.username);
    console.log("Is friendrequstlist: "+ this.isfriendrequestlist);

    this.checkifFriends(this.authenticationService.getLoggedInUserName());
    
  }


  checkifFriends(username:any) {

    this.userService.getUsers(username).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.loggedInUser = res;

        this.userService.getUsers(this.user.username).subscribe(res => {
          this.zone.run(() => {
            this.userCompleteObject = res;

        
            for(let i = 0; i< this.loggedInUser.pendingFriends.length;i++){
              if(this.loggedInUser.pendingFriends[i] == this.user.username){
                this.sentRequest = true;
                break;
              }
            }
            // for(let i = 0; i< this.userCompleteObject.pendingFriends.length;i++){
            //   if(this.userCompleteObject.pendingFriends[i] == this.loggedInUser.username){
            //     this.sentRequest = true;
            //     break;
            //   }
            // }
            for(let i = 0; i< this.loggedInUser.friends.length;i++){
              if(this.loggedInUser.friends[i].username == this.user.username){
                this.isFriendWithUser = true;
                break;
              }
            }
          })
        })
       
      });
    });

  }



  sendFriendRequest(username:any,loggedinUsername:any){
    console.log("Friend Request Sent to : " + username + " --- " + loggedinUsername);
    
    //kjo do cohet me websocket
    this.userService.addRequestToPendingList(username, loggedinUsername).subscribe();

  }


  
  unsendFriendRequest(username:any,loggedinUsername:any){
    console.log("Friend Request unSent to : " + username + " --- " + loggedinUsername);
    
    this.userService.unsendRequestToPendingList(username, loggedinUsername).subscribe();
    this.sentRequest  = false;
  }



  requestAccepted(receiver:any,accepter:any){
    //remove pendingFriends to sender, send notification to sender, add each other to friend list
    this.unsendFriendRequest(accepter,receiver);
    this.userService.friendRequestAccepted(receiver,accepter).subscribe();

  }


  requestNotAccepted(receiver:any,accepter:any){
    this.userService.friendRequestNotAccepted(receiver,accepter).subscribe();
  }

}
