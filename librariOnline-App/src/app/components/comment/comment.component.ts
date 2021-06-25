import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subjectpost } from 'src/app/model/posts/subjectpost';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SingleSubjectPostWebSocketAPI } from 'src/app/websocket/SingleSubjectPostWebSocketAPI';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() postid: string = '';

  @Output() likeCommentEvent = new EventEmitter<any>();
  @Output() replyCommentEvent = new EventEmitter<any>();

  @Input() comment: any = {

  };
  @Input() callbackFunction!: (postid: any, commentId: any, replies: any) =>void;
  @Input() callbackLikeComment_Function!: (postid: any, commId: any) =>void;
  _post:Subjectpost = new Subjectpost();
  commentText:string = '';
  displayReplies:boolean  = false;
  constructor(private authenticatedService:AuthenticationService, private route: ActivatedRoute, private router: Router,private subjectpostwebsocket:SingleSubjectPostWebSocketAPI) { }

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
    this.subjectpostwebsocket.onSend(`/topic/like/comment/${this.postid}/${commId}/${this.authenticatedService.getLoggedInUserName()}`);
      this._post =  await this.subjectpostwebsocket.getPost();

    this.likeCom(this._post);

  }

  likeCom(subjectPost:Subjectpost) {
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
  
    
    this.subjectpostwebsocket.onSendSave(`/topic/add/comment/${this.postid}/${commId}`,replies);
    this._post = await this.subjectpostwebsocket.getPost();

    this.replytoCom(this._post);

  }

  replytoCom(subjectPost:Subjectpost) {
    this.replyCommentEvent.emit(subjectPost);
  }

  toggleRepliesShow(){
    this.displayReplies  = !this.displayReplies;
  }
}
