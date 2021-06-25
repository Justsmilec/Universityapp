import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getuserUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient) { 
    this.getuserUrl = "http://localhost:8081/api/v1/users";
    this.saveuserUrl = "http://localhost:8081/api/v1/save";
  }

  public findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.getuserUrl);
   
  }
  public save(user: User){
    console.log(user);
    
    return this.http.post<User>(this.saveuserUrl,user);
  }


  getUsers(username:any):Observable<User> {
    return this.http.get<User>(`http://localhost:8081/api/v1/user/${username}`).pipe(map(data => {return data}));
    
  }
  getUsersFromId(id:any):Observable<User> {
    return this.http.get<User>(`http://localhost:8081/api/v1/user/findByid/${id}`).pipe(map(data => {return data}));
    
  }


  addRequestToPendingList(receiver:any,sender:any){
    let obj:any = {
      obj_receiver: receiver,
      obj_sender: sender
    }

    console.log("p-------: " + receiver + " -- "+ sender);
    
    return this.http.post<User>(`http://localhost:8081/api/v1/user/sendRequest/${receiver}/${sender}`,obj)
  }


  unsendRequestToPendingList(receiver:any,sender:any){
    let obj:any = {
      obj_receiver: receiver,
      obj_sender: sender
    }

    console.log("p-------: " + receiver + " -- "+ sender);
    
    return this.http.post<User>(`http://localhost:8081/api/v1/user/unsendRequest/${receiver}/${sender}`,obj)
  }


  friendRequestAccepted(receiver:any,accepter:any){
    

    console.log("p-------: " + receiver + " -- "+ accepter);
    
    return this.http.put<User>(`http://localhost:8081/api/v1/user/friendrequest/accept/${accepter}/${receiver}`,{})
  }

  friendRequestNotAccepted(receiver:any,accepter:any){
    

    //console.log("p-------: " + receiver + " -- "+ sender);
    
    return this.http.post<User>(`http://localhost:8081/api/v1/user/friendrequest/notaccept/${accepter}/${receiver}`,{})
  }


  setNotificationAsreadState(username:any){
    return this.http.post<User>(`http://localhost:8081/api/v1/user/updatenotification/setasread/${username}`,{})

  }
}
