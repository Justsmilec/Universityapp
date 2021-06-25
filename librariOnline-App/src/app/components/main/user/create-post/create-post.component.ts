import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userpost } from 'src/app/model/posts/userpost';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SingleUserPostWebSocketAPI } from 'src/app/websocket/SingleUserPostWebSocketAPI';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  posttitle:string = '';
  posttext:string = '';

  userpost:Userpost = new Userpost();
  constructor(private router: Router, private route: ActivatedRoute,private userpostwebsocket: SingleUserPostWebSocketAPI,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  addPost(){
    this.userpost.postTitle = this.posttitle;
    this.userpost.postText = this.posttext;
    this.userpost.userUsername = this.authenticationService.getLoggedInUserName();

    this.userpostwebsocket.onSendSave(`/topic/user/add/post`,this.userpost);
    //this._post = await this.userpostwebsocket.getPost();

    this.router.navigate(['app']);

  }

}
