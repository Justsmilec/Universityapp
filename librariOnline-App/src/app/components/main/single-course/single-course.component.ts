import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subjectpost } from 'src/app/model/posts/subjectpost';
import { SubjectPostWebSocketAPI } from 'src/app/websocket/SubjectPostWebSocketAPI';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {


  
  constructor(private route: ActivatedRoute, private router: Router,private subjectpostwebsocket:SubjectPostWebSocketAPI) { }

  
  @Input() _post: Subjectpost = new Subjectpost();
  @Input() likePostCallBack!: (postid: any) =>void;

  ngOnInit(): void {
  }


  displayPostDetails(postid:any){
    this.router.navigate(['app/subject/post',postid])


  }


  likePost(postid:any){

    console.log("--- : "+ postid);

    
    this.likePostCallBack(postid);
  }

  
}
