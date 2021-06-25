import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Userpost } from '../model/posts/userpost';

@Injectable({
  providedIn: 'root'
})
export class UserpostService {


  private getUniversitiesUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient) { 
    this.getUniversitiesUrl = "http://localhost:8081/api/v1/university/getall";
    this.saveuserUrl = "http://localhost:8081/api/v1/save";
  }




  getPostsForuser(username:string):Observable<Userpost[]> {
    return this.http.get<Userpost[]>(`http://localhost:8081/api/v1/users/posts/get/user/${username}`).pipe(map(data => {return data}));
    
  }


}
