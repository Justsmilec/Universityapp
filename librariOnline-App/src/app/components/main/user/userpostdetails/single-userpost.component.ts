import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userpost } from 'src/app/model/posts/userpost';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SingleUserPostWebSocketAPI } from 'src/app/websocket/SingleUserPostWebSocketAPI';

@Component({
  selector: 'app-single-userpost',
  templateUrl: './single-userpost.component.html',
  styleUrls: ['./single-userpost.component.css']
})
export class SingleUserpostComponent implements OnInit {


  _post:Userpost = new Userpost();
  post:Userpost = new Userpost();

  commentText:any;
  constructor(private zone:NgZone,private authenticatedService:AuthenticationService, private route: ActivatedRoute, private router: Router,private userpostwebsocket:SingleUserPostWebSocketAPI) {
   }

  ngOnInit(): void {
    
    let postid = this.route.snapshot.paramMap.get('postid');
    console.log("---: ;;;;;  " + postid);
    
    this.getPostWebsocket(postid);
    
  }

  async getPostWebsocket(postid:any) {
    this.userpostwebsocket.onSend(`/topic/getsingleuserpost/${postid}`);
    this._post = await this.userpostwebsocket.getPost();
  }

  makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*&^%$#@!";

    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  async addComment(){
    var comment:any = {
      commentId:   this.makeRandom(20),
      userwhocommented: this.authenticatedService.getLoggedInUserName(),
      comment: this.commentText,
      likeonComment:[],
      replies:[],
    }
    this.userpostwebsocket.onSendSave(`/topic/add/comment_user/${this._post.id}`, comment);


      this.resolveAfter2Seconds(20).then(async() => {
        this._post = await this.userpostwebsocket.getPost();
    });  
    
    this.commentText = '';
  }

  resolveAfter2Seconds(x:any) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 4000);
    });
}
   
  // async myCallbackFunction (postid: any,commId:any,replies: any){
  //   //callback code here
  //   this.subjectpostwebsocket.onSendSave(`/topic/add/comment/${postid}/${commId}`,replies);
  //       this._post = await this.subjectpostwebsocket.getPost();

  //   }
    //Like post
    async likePost(postid:any,postOfUser:any){
      console.log("logg " + postid );
      let user = this.authenticatedService.getLoggedInUserName();
      this.userpostwebsocket.onSend(`/topic/like/singleuserpost/${postid}/${user}/${user}`);
      this._post = await this.userpostwebsocket.getPost();
    }

    likeComment(subjectpost: Userpost) {
      this._post = subjectpost;
    }

    replyComment(subjectpost: Userpost){
      this._post = subjectpost;

    }

}
