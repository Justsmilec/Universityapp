import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME: string = 'authenticatedUser';
  public username: String = '';
  public password: String = '';

  constructor(private http: HttpClient) { }

  authenticate(username: string,password: string){

    return this.http.get<User>(`http://localhost:8081/api/v1/basicauth`,
        { headers: { Authorization: this.createBasicAuthToken(username,password)}}).pipe(map((res) => {
            this.username = username;
            this.password = password;
            this.registerSuccessLogin(username,password);       
            console.log("***)00: ",res);
                 
            return res;
        }));
  }

  isUserLoggedin(){
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    console.log(!(user === null));
    return !(user === null);
    
  }
  getLoggedInUserName(){
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if(user === null) return ''
    return user;
  }

  logOut(){
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  registerSuccessLogin(username: string, password: string){
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,username);
  }
 
  createBasicAuthToken(username: String, password: String){
    return 'Basic ' + window.btoa(username + ':' + password);
  }
 
}
