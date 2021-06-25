import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { University } from 'src/app/model/university/university';
import { UniversityService } from 'src/app/service/university.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent implements OnInit {


  showMapPopUp:boolean = false;
  mapurl:string = '';

  universityList: Array<University> = [];
  constructor(private zone: NgZone, private http: HttpClient,private universityService: UniversityService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUniversities();
    console.log("---: ", this.universityList.length);
    
  }

  returnUniversities() {

    this.universityService.getUniversities().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.universityList = res;
      });
    });
  }

  listUnivFaculties($id:any){
    this.router.navigate(['app/view_faculties/',$id])


  }


  
  displayMap(univ:any){
    this.showMapPopUp = true;
    console.log("---AAAA: "+ univ);
    console.log("---AAAA: "+ this.showMapPopUp);
    this.mapurl = univ;

    
  }
  getMsgFromBaby($event:boolean) {
    this.showMapPopUp = $event;
  }

}
