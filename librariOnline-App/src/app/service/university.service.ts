import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Faculty } from '../model/faculty/faculty';
import { University } from '../model/university/university';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  universityDTO:any = [];
  private getUniversitiesUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient) { 
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


  getUniversities():Observable<University[]> {
    return this.http.get<University[]>(`http://localhost:8081/api/v1/university/getall`).pipe(map(data => {return data}));
    
  }
  // getUsersFromId(id:any):Observable<User> {
  //   return this.http.get<User>(`http://localhost:8081/api/v1/user/findByid/${id}`).pipe(map(data => {return data}));
    
  // }

  getFacultiesFromUniveId(id:any):Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`http://localhost:8081/api/v1/university/univfaculties/${id}`).pipe(map(data => {return data}));
    
  }


  getUniversityDTO():Observable<any>{
    return this.http.get<any>(`http://localhost:8081/api/v1/university/dto`).pipe(map(data => {return data}));

  }

  getFacultiesDTOFromUniveId(id:any):Observable<any> {
    return this.http.get<any>(`http://localhost:8081/api/v1/faculty/university/getfacultydto/${id}`).pipe(map(data => {return data}));
    
  }


}
