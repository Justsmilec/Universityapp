import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  username:string ='';
  url:any;
  file: any;
  addedItem: boolean | undefined;

  user: User = new User();
  constructor(private authenticationService:AuthenticationService, private zone:NgZone,private httpClient:HttpClient,private router: Router,private userService:UserService) { }

  ngOnInit(): void {

    this.returnUsersPost(this.authenticationService.getLoggedInUserName());

  }



  
  returnUsersPost(username:string) {

    this.userService.getUsers(username).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.user = res;
        console.log( " ------- : " ,this.user);
        this.url = this.user.profilePic;

      });
    });
  }

  onSubmit(){

    let obj:any = {
      newname: this.username,
      newurl: this.url
    }
    this.httpClient.put(`http://localhost:8081/api/v1/user/updateProfile/${this.authenticationService.getLoggedInUserName()}`, obj, {observe: 'response' })
  
  .subscribe((response) => {



    // if (response.status === 200) {

    //   this.message = 'Image uploaded successfully';

    // } else {

    //   this.message = 'Image not uploaded successfully';

    // }

    //sessionStorage.setItem("authenticateUser",this.user.username);


    this.router.navigate(['/app'])

  }

  );
  }

  updateFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        
      }
  
      reader.readAsDataURL(event.target.files[0]);
      console.log("----: ",event.target.files[0]);

    }  
  }


}
