import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() dataTakenFromParentToMain: string = '';
  users: User[] = [];

  constructor(private userService: UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userService.findAll().subscribe(data => {
      this.users = data;
    })
    console.log(this.users.length);
    
  }

  clickDiv(){
    console.log('---------');
    
  }

}
