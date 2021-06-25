import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dege } from '../model/dege/dege';
import { Faculty } from '../model/faculty/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

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


  getFaculties():Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`http://localhost:8081/api/v1/faculty/getall`).pipe(map(data => {return data}));
    
  }
  getFacultiesFromUniveId(id:any):Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`http://localhost:8081/api/v1/university/univFaculties/${id}`).pipe(map(data => {return data}));
    
  }

  getFacultyFromId(id:any):Observable<Faculty> {
    return this.http.get<Faculty>(`http://localhost:8081/api/v1/faculty/getFaculty/${id}`).pipe(map(data => {return data}));
    
  }

  getCoursesFromFaculty(id:any):Observable<Dege[]>{
    return this.http.get<Dege[]>(`http://localhost:8081/api/v1/faculty/deget/${id}`).pipe(map(data => {return data}));

  }




}
