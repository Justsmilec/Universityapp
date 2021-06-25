import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty/faculty';
import { FacultyService } from 'src/app/service/faculty.service';
import { UniversityService } from 'src/app/service/university.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  faculties: Array<Faculty> = [];
  constructor(private zone: NgZone, private http: HttpClient,private universityService: UniversityService,private facultyService: FacultyService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('univ_id'); 
    if(id != null)
      this.returnFaculties(id);
    if(id == null ){
      this.returnallFaculties();
    }
  }

  returnFaculties(id:any) {

    this.universityService.getFacultiesFromUniveId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.faculties = res;
      });
    });
  }
  returnallFaculties() {

    this.facultyService.getFaculties().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.faculties = res;
      });
    });
  }

  
  listDegetFromFaculty($id:any){
    this.router.navigate(['app/view_deget/',$id])


  }
  
}
