import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { DegeComponent } from './components/dege/dege.component';
import { FacultyListComponent } from './components/faculty-list/faculty-list.component';
import { FriendRequestListComponent } from './components/friend-request-list/friend-request-list.component';
import { LoginComponent } from './components/login/login.component';
import { CourseComponent } from './components/main/course/course.component';
import { DetailCourseComponent } from './components/main/detail-course/detail-course.component';
import { MainComponent } from './components/main/main.component';
import { CreatePostComponent } from './components/main/user/create-post/create-post.component';
import { EditprofileComponent } from './components/main/user/editprofile/editprofile.component';
import { UserProfileComponent } from './components/main/user/user-profile/user-profile.component';
import { SingleUserpostComponent } from './components/main/user/userpostdetails/single-userpost.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { SubjectpostdetailsComponent } from './components/subjectpostdetails/subjectpostdetails.component';
import { UniversityListComponent } from './components/university-list/university-list.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

const routes: Routes = [
  { path: '', component: LoginComponent,

 },
 { path: 'signup', component: SignUpComponent},

  { path: 'app', component: MainComponent, canActivate: [AuthGaurdService],
    children:[
      { path: '', component: CourseComponent, canActivate: [AuthGaurdService]},

      { path: 'view', component: ViewUserComponent, canActivate: [AuthGaurdService]},
      { path: 'user/createpost', component: CreatePostComponent, canActivate: [AuthGaurdService]},
      { path: 'user/updateprofile', component: EditprofileComponent, canActivate: [AuthGaurdService]},
      { path: 'searchcourse/:searchtext', component: CourseComponent, canActivate: [AuthGaurdService]},

      { path: 'view_course', component: DetailCourseComponent, canActivate: [AuthGaurdService]},
      { path: 'view_universities', component: UniversityListComponent, canActivate: [AuthGaurdService]},
      { path: 'view_faculties', component: FacultyListComponent, canActivate: [AuthGaurdService]},
      { path: 'view_faculties/:univ_id', component: FacultyListComponent, canActivate: [AuthGaurdService]},



    ]
  },

  
  { path: 'app', component: MainComponent, canActivate: [AuthGaurdService],
    children:[
      { path: 'view_faculties/:univ_id', component: FacultyListComponent, canActivate: [AuthGaurdService]},
      { path: 'view_deget/:faculty_id', component: DegeComponent, canActivate: [AuthGaurdService]},
      { path: 'view_courses/:dege_id', component: CourseListComponent, canActivate: [AuthGaurdService]},
      { path: 'view_courses/user/:username', component: CourseListComponent, canActivate: [AuthGaurdService]},
      { path: 'viewSubject_Details/:subject_id', component: SubjectDetailsComponent, canActivate: [AuthGaurdService]},
      { path: 'viewuser/friendrequests', component: FriendRequestListComponent, canActivate: [AuthGaurdService]},

      { path: 'subject/post/:postid', component: SubjectpostdetailsComponent, canActivate: [AuthGaurdService]},

      { path: 'user/post/singlepost/:postid', component: SingleUserpostComponent, canActivate: [AuthGaurdService]},



    ]
  },

  { path: 'app/user/:id', component: MainComponent, canActivate: [AuthGaurdService],
    children:[
      { path: '', component: UserProfileComponent, canActivate: [AuthGaurdService]},


    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
