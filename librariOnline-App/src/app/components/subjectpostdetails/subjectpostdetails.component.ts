import { Component, NgZone, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subjectpost } from 'src/app/model/posts/subjectpost';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SingleSubjectPostWebSocketAPI } from 'src/app/websocket/SingleSubjectPostWebSocketAPI';
import { SubjectPostWebSocketAPI } from 'src/app/websocket/SubjectPostWebSocketAPI';

@Component({
  selector: 'app-subjectpostdetails',
  templateUrl: './subjectpostdetails.component.html',
  styleUrls: ['./subjectpostdetails.component.css']
})
export class SubjectpostdetailsComponent implements OnInit {

  _post:Subjectpost = new Subjectpost();
  post:Subjectpost = new Subjectpost();

  commentText:any;
  constructor(private zone:NgZone,private authenticatedService:AuthenticationService, private route: ActivatedRoute, private router: Router,private subjectpostwebsocket:SingleSubjectPostWebSocketAPI) {
   }

  ngOnInit(): void {
    
    let postid = this.route.snapshot.paramMap.get('postid');
    this.getPostWebsocket(postid);
    
  }

  async getPostWebsocket(postid:any) {
    this.subjectpostwebsocket.onSend(`/topic/getsingle/${postid}`);
    this._post = await this.subjectpostwebsocket.getPost();
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
    this.subjectpostwebsocket.onSendSave(`/topic/add/comment/${this._post.id}`, comment);


      this.resolveAfter2Seconds(20).then(async() => {
        this._post = await this.subjectpostwebsocket.getPost();
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
    async likePost(postid:any){
      console.log("logg " + postid );
      let user = this.authenticatedService.getLoggedInUserName();
      this.subjectpostwebsocket.onSend(`/topic/like/singlepost/${postid}/${user}`);
      this._post = await this.subjectpostwebsocket.getPost();
    }

    likeComment(subjectpost: Subjectpost) {
      this._post = subjectpost;
    }

    replyComment(subjectpost: Subjectpost){
      this._post = subjectpost;

    }
}
