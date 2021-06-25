import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dege } from '../model/dege/dege';

@Injectable({
  providedIn: 'root'
})
export class DegeService {

  
  private getUniversitiesUrl: string;
  private saveuserUrl: string;
  constructor(private http: HttpClient) { 
    this.getUniversitiesUrl = "http://localhost:8081/api/v1/university/getall";
    this.saveuserUrl = "http://localhost:8081/api/v1/save";
  }




  getDeget():Observable<Dege[]> {
    return this.http.get<Dege[]>(`http://localhost:8081/api/v1/dege/getall`).pipe(map(data => {return data}));
    
  }


  getDegetFromFacultyId(id:any):Observable<Dege[]> {
    return this.http.get<Dege[]>(`http://localhost:8081/api/v1/faculty/deget/${id}`).pipe(map(data => {return data}));
    
  }

  getDegeFromId(id:any):Observable<Dege> {
    return this.http.get<Dege>(`http://localhost:8081/api/v1/dege/getdega/${id}`).pipe(map(data => {return data}));
    
  }
}
