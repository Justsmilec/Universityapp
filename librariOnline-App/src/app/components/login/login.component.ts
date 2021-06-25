import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any = '';
  password: any = '';
  invalidLogin: boolean = false;
  constructor(private router: Router,private loginService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.loginService.isUserLoggedin())
    {
      this.router.navigate(['/app'])

    }    
    
    console.log("---: ", this.loginService.getLoggedInUserName());
    
  }

  checkLogin(){
    console.log(this.username + this.password);

    (this.loginService.authenticate(this.username,this.password).subscribe(
      data => {
        this.router.navigate(['/app/'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true;
      }
    ));  
  }

  signup(){
    this.router.navigate(['/signup'])
  }

}
