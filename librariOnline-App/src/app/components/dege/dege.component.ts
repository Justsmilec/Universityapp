import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dege } from 'src/app/model/dege/dege';
import { DegeService } from 'src/app/service/dege.service';
import { FacultyService } from 'src/app/service/faculty.service';

@Component({
  selector: 'app-dege',
  templateUrl: './dege.component.html',
  styleUrls: ['./dege.component.css']
})
export class DegeComponent implements OnInit {

  deget: Array<Dege> = [];
  constructor(private zone: NgZone, private http: HttpClient,private degeService: DegeService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('faculty_id'); 
    if(id != null)
      this.returnDeget(id);
    if(id == null ){
      this.returnallDeget();
    }
  }


  returnDeget(id:any) {

    this.degeService.getDegetFromFacultyId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.deget = res;
      });
    });
  }
  returnallDeget() {

    this.degeService.getDeget().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.deget = res;
      });
    });
  }

  listCoursesFromDege($id:any){
    this.router.navigate(['app/view_courses/',$id])

  }

}
