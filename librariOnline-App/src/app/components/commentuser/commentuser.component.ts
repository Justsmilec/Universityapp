import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subjectpost } from 'src/app/model/posts/subjectpost';
import { Userpost } from 'src/app/model/posts/userpost';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SingleSubjectPostWebSocketAPI } from 'src/app/websocket/SingleSubjectPostWebSocketAPI';
import { SingleUserPostWebSocketAPI } from 'src/app/websocket/SingleUserPostWebSocketAPI';

@Component({
  selector: 'app-commentuser',
  templateUrl: './commentuser.component.html',
  styleUrls: ['./commentuser.component.css']
})
export class CommentuserComponent implements OnInit {

  @Input() postid: string = '';

  @Output() likeCommentEvent = new EventEmitter<any>();
  @Output() replyCommentEvent = new EventEmitter<any>();

  @Input() comment: any = {

  };
  @Input() callbackFunction!: (postid: any, commentId: any, replies: any) =>void;
  @Input() callbackLikeComment_Function!: (postid: any, commId: any) =>void;
  _post:Userpost = new Userpost();
  commentText:string = '';
  displayReplies:boolean  = false;
  constructor(private authenticatedService:AuthenticationService, private route: ActivatedRoute, private router: Router,private userpostwebsocket:SingleUserPostWebSocketAPI) { }

  ngOnInit(): void {
    //this.comment = this.POST.comments;
  }


  
  makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%$#@";

    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  async likecomment(commId:any){
    //this.callbackLikeComment_Function(commId,this.postid);
    this.userpostwebsocket.onSend(`/topic/like/comment_user/${this.postid}/${commId}/${this.authenticatedService.getLoggedInUserName()}`);
      this._post =  await this.userpostwebsocket.getPost();

    this.likeCom(this._post);

  }

  likeCom(subjectPost:Userpost) {
    this.likeCommentEvent.emit(subjectPost);
  }


  async addreplytoComment(commId:any){
    var comment:any = {
      commentId:   this.makeRandom(20),
      userwhocommented: this.authenticatedService.getLoggedInUserName(),
      comment: this.commentText,
      likeonComment:[],
      replies:[],
    }
    var replies = {
      reply: comment
    }
  
    
    this.userpostwebsocket.onSendSave(`/topic/add/comment_user/${this.postid}/${commId}`,replies);
    this._post = await this.userpostwebsocket.getPost();

    this.replytoCom(this._post);

    this.displayReplies = true;

  }

  replytoCom(subjectPost:Userpost) {
    this.replyCommentEvent.emit(subjectPost);
  }

  toggleRepliesShow(){
    this.displayReplies  = !this.displayReplies;
  }
}
