import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/subject/subject';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DegeService } from 'src/app/service/dege.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { SubjectserviceService } from 'src/app/service/subjectservice.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  subject:Subject = new Subject();
  subjectAdditionDetails: any = {

  }
  usertoPass: Array<User> = []
  facultyofsubject: string = '';
  joinButtonText: string = "Join";
  joinButtonStatus: boolean = true;  // false is -> join is enable   true -> drop is enable 
  constructor(private zone: NgZone, private authenticationService: AuthenticationService,private userService: UserService,private http: HttpClient,private degeService: DegeService,private facultyService: FacultyService,private subjectService:SubjectserviceService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('subject_id'); 
    this.returnSubject(id);
  }


  returnSubject(id:any) {

    this.subjectService.getSubjectId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.subject = res;
        this.returnFaculty(this.subject.dega.id);
        this.usertoPass = this.subject.students;
        this.removeUserFromList();

        this.joinButtonStatus = this.subjectService.checkifExistStudent(this.subject,this.authenticationService.getLoggedInUserName());
        if(this.joinButtonStatus)
          this.joinButtonText = "DROP"
        else
          this.joinButtonText = "JOIN"

      });
    });

  }



  
  returnFaculty(id:any) {

    console.log("------  degeID: " + id);
    
    this.degeService.getDegeFromId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.facultyofsubject = res.faculty.id;
        
          console.log("------  facultyID: " + this.facultyofsubject);

          this.facultyService.getFacultyFromId(this.facultyofsubject).subscribe(res => {
            this.zone.run(() => { // <== execute the changes in this callback.
              this.subjectAdditionDetails.facultyid = res.id;
              this.subjectAdditionDetails.facultyname = res.name;
              this.subjectAdditionDetails.facultymapURL = res.mapURL;
            });
          });
      });
    });
    

  }


  removeUserFromList(){
          this.usertoPass = this.usertoPass.filter(obj => obj.username != this.authenticationService.getLoggedInUserName())
      
    
  }


  dealwithsubjectAttending(){

    if(this.joinButtonStatus == false){
        
      this.userService.getUsers(this.authenticationService.getLoggedInUserName()).subscribe(res => {
        this.zone.run(() => { // <== execute the changes in this callback.
          let usernametoadd = res.username;

          this.subjectService.addStudentOnList(this.subject.id,usernametoadd).subscribe()
          this.joinButtonStatus = true;
          this.joinButtonText = "DROP";
        });
      });
    }


    else{
      this.userService.getUsers(this.authenticationService.getLoggedInUserName()).subscribe(res => {
        this.zone.run(() => { // <== execute the changes in this callback.
          let usernametoadd = res.username;

          this.subjectService.dropStudentOnList(this.subject.id,usernametoadd).subscribe()
          this.joinButtonStatus = false;
          this.joinButtonText = "JOIN";
        });
      });

    }
    

  }
}
