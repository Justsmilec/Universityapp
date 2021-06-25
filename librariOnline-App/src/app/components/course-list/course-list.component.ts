import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/subject/subject';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CourseService } from 'src/app/service/course.service';
import { SubjectserviceService } from 'src/app/service/subjectservice.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Array<Subject> = [];
  allcourses: Array<Subject> = [];
  coursesStringToDisplay: Array<String> = [];
  user: User = new User();
  constructor(private zone: NgZone, private userService: UserService, private authenticationService: AuthenticationService, private http: HttpClient, private subjectService: SubjectserviceService, private courseService: CourseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('dege_id');
    let username = this.route.snapshot.paramMap.get("username");
    console.log("---------->>>>>>> " + username);
    console.log("---------->>>>>>> " + id);


    if (username != null) {
      this.returnAllCoursesOfUser();
    }
    else {
      if (id != null)
        this.returnCourses(id);
      if (id == null) {
        this.returnallCourses();
      }
    }
  }



  returnCourses(id: any) {

    this.courseService.getCoursesFromDegeId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.courses = res;
      });
    });
  }
  returnallCourses() {

    this.courseService.getCourses().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.courses = res;
      });
    });
  }



  subjectDetails($id: any) {
    this.router.navigate(['app/viewSubject_Details/', $id])


  }



  returnAllCoursesOfUser() {

    this.subjectService.getAllSubjects().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.allcourses = res;

        this.userService.getUsers(this.authenticationService.getLoggedInUserName()).subscribe(res1 => {
          this.zone.run(() => { // <== execute the changes in this callback.
            this.user = res1;
            this.coursesStringToDisplay = this.subjectService.returnAllCoursesofStudent(this.allcourses, this.user);
            for (let i = 0; i < this.coursesStringToDisplay.length; i++) {
              for(let j = 0;j<this.allcourses.length;j++){              
                if (this.coursesStringToDisplay[i] == this.allcourses[j].id) {
                  this.courses.push(this.allcourses[j]);
                }
              }
            }
          }, 2000);
        });
      });
    });

    }
  }
