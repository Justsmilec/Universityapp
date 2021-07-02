import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subjectpost } from 'src/app/model/posts/subjectpost';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SubjectPostWebSocketAPI } from 'src/app/websocket/SubjectPostWebSocketAPI';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private route: ActivatedRoute, private router: Router,private subjectpostwebsocket:SubjectPostWebSocketAPI) { }

  owner:string = "";
  title:string = "";
  tags:Array<string> = [];

  search: string = '';
  user:any = '';

  subjectPosts:Array<Subjectpost> = [];
  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('username');
    
    this.owner = "Adem";
    this.title = "I am working on this Project Alone";
    this.tags = new Array<string>("#code","#angular","#java");
    this.sendToWebsocket();

    if(this.route.snapshot.paramMap.get("seachtext") != ''){
      console.log("hahahahha qr");
      let l = this.route.snapshot.paramMap.get("seachtext");
      this.sendToWebsocketOnSearch(l);
    }
  }

  async sendToWebsocket() {
    this.subjectpostwebsocket.onSend(`/topic/get/${this.authenticationService.getLoggedInUserName()}`);
    this.subjectPosts = await this.subjectpostwebsocket.getList();
     console.log("helloooo  ", this.subjectpostwebsocket.subjectsposts);

  }
  async sendToWebsocketOnSearch(searchtext:any) {
    this.subjectpostwebsocket.onSend(`/topic/get/search/${this.authenticationService.getLoggedInUserName()}/${searchtext}`);
    this.subjectPosts = await this.subjectpostwebsocket.getList();
     console.log("helloooo  ", this.subjectpostwebsocket.subjectsposts);

  }
  showUniversities(){
      this.router.navigate(['app/view_universities'])
  }
  showFaculties(){
    this.router.navigate(['app/view_faculties'])

  }

  showDeget(){
    this.router.navigate(['app/view_deget'])

  }


  myLikePostCallBack = async (postid: any): Promise<void> => {
    //callback code here
    console.log("logg " + postid );
    let user = this.authenticationService.getLoggedInUserName();
    this.subjectpostwebsocket.onSend(`/topic/like/post/${postid}/${user}`);
    this.subjectPosts = await this.subjectpostwebsocket.getList();

    }

}
