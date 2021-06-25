import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dege } from '../model/dege/dege';
import { Subject } from '../model/subject/subject';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private getUniversitiesUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient) { 
    this.getUniversitiesUrl = "http://localhost:8081/api/v1/university/getall";
    this.saveuserUrl = "http://localhost:8081/api/v1/save";
  }




  getCourses():Observable<Subject[]> {
    return this.http.get<Subject[]>(`http://localhost:8081/api/v1/subject/getall`).pipe(map(data => {return data}));
    
  }


  getCoursesFromDegeId(id:any):Observable<Subject[]> {
    return this.http.get<Subject[]>(`http://localhost:8081/api/v1/subject/dege/${id}`).pipe(map(data => {return data}));
    
  }
}
