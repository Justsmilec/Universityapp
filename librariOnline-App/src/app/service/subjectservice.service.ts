import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from '../model/subject/subject';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {

  private getUniversitiesUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient,private userService:UserService, private zone :NgZone) { 
    this.getUniversitiesUrl = "http://localhost:8081/api/v1/university/getall";
    this.saveuserUrl = "http://localhost:8081/api/v1/save";
  }




  // getDeget():Observable<Subject> {
  //   return this.http.get<Subject>(`http://localhost:8081/api/v1/dege/getall`).pipe(map(data => {return data}));
    
  // }

  getAllSubjects():Observable<Subject[]> {
    return this.http.get<Subject[]>(`http://localhost:8081/api/v1/subject/getall`).pipe(map(data => {return data}));
    
  }


  getSubjectId(id:any):Observable<Subject> {
    return this.http.get<Subject>(`http://localhost:8081/api/v1/subject/getsubject/${id}`).pipe(map(data => {return data}));
    
  }

  addStudentOnList(subject_id:any,username:any):Observable<Subject>{
    return this.http.post<Subject>(`http://localhost:8081/api/v1/subject/addStudentList/${subject_id}/${username}`,{})


  }

  dropStudentOnList(subject_id:any,username:any):Observable<Subject>{
    return this.http.post<Subject>(`http://localhost:8081/api/v1/subject/dropStudentList/${subject_id}/${username}`,{})


  }

  checkifExistStudent(subject:Subject,username:any):boolean{

    if(subject.students.filter(obj => obj.username == username)  == null)
      return false;
    else 
      return true;


  }


  returnAllCoursesofStudent(subjects:Array<Subject>,user:User): Array<String>{
    var arrayOfSubjects: Array<String> = [];


        for(let i = 0 ;i<subjects.length;i++)
        {
          for(let j = 0;j<subjects[i].students.length;j++)
          {
            if(subjects[i].students[j].username == user.username && subjects[i].semester == user.actualSemester)
              {
                arrayOfSubjects.push(subjects[i].id)
              }
          }           
        }     
      return arrayOfSubjects;
  }

}
