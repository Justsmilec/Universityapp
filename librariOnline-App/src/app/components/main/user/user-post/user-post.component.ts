import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userpost } from 'src/app/model/posts/userpost';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {


  @Input() _post: Userpost = new Userpost();
  @Input() likePostCallBack!: (postid: any,postofUser:any) =>void;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  displayPostDetails(postId:any,postOfUser:any){
    this.router.navigate(['app/user/post/singlepost',postId])


  }

  likePost(postid:any,postofUser:any){

    console.log("--- : "+ postid);

    
    this.likePostCallBack(postid,postofUser);
  }
}
