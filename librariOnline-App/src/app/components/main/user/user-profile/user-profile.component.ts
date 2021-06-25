import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userpost } from 'src/app/model/posts/userpost';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { UserpostService } from 'src/app/service/userpost.service';
import { UserPostWebSocketAPI } from 'src/app/websocket/UserPostWebSocketAPI';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User = new User();
  showFriendsPopUp:boolean = false;
  userPosts:Array<Userpost> = [];

  constructor(private zone: NgZone, private authenticationSerivce:AuthenticationService,private userpostsWebSocket:UserPostWebSocketAPI,private http: HttpClient, private userPost:UserpostService,private userService: UserService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
      this.returnUserFromId(id);
      this.returnUsersPost(this.authenticationSerivce.getLoggedInUserName());
  }
  returnUserFromId(id: any) {

    this.userService.getUsersFromId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.user = res;
        console.log(this.user);
      });
    });
  }

  returnUsersPost(username:string) {

    this.userPost.getPostsForuser(username).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.userPosts = res;
      });
    });
  }

  displayFriends(){
    this.showFriendsPopUp = true;
    console.log("---AAAA: "+ this.showFriendsPopUp);
    
  }

  displayCourseList(){
    this.router.navigate(['app/view_courses/user/',this.user.username])

  }
  createPost(){
    this.router.navigate(['app/user/createpost'])

  }

  getMsgFromBaby($event:boolean) {
    this.showFriendsPopUp = $event;
  }


  myLikePostCallBack = async (postid: any,postofUser:any): Promise<void> => {
    //callback code here
    console.log("logg " + postid );
    let user = this.authenticationSerivce.getLoggedInUserName();
    this.userpostsWebSocket.onSend(`/topic/like/userpost/${postid}/${user}/${postofUser}`);
    this.userPosts = await this.userpostsWebSocket.getList();
    console.log("----: " + this.userPosts.length);
    

    }


}
