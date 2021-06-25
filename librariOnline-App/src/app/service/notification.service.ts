import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification, Observable } from 'rxjs';
import { Notification1 } from '../model/notification/notification';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private getUniversitiesUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient,private userService:UserService) { 
    this.getUniversitiesUrl = "http://localhost:8081/api/v1/university/getall";
    this.saveuserUrl = "http://localhost:8081/api/v1/save";
  }

  // public findAll(): Observable<University[]>{
  //   return this.http.get<University[]>(this.getUniversitiesUrl);
   
  // }
  // public save(user: User){
  //   console.log(user);
    
  //   return this.http.post<User>(this.saveuserUrl,user);
  // }


  getNotificationsofuser(user:User):Array<Notification1> {
    console.log("in service : ", user.notifications);
    
    return user.notifications;
    
  }
  


}
