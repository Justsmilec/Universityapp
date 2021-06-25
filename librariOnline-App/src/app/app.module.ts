import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { CourseComponent } from './components/main/course/course.component';
import { SingleCourseComponent } from './components/main/single-course/single-course.component';
import { DetailCourseComponent } from './components/main/detail-course/detail-course.component';
import { UserProfileComponent } from './components/main/user/user-profile/user-profile.component';
import { UserPostComponent } from './components/main/user/user-post/user-post.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FriendsPopUpComponent } from './components/friends-pop-up/friends-pop-up.component';
import { FriendsingleElementComponent } from './components/friendsingle-element/friendsingle-element.component';
import { UniversityListComponent } from './components/university-list/university-list.component';
import { FacultyListComponent } from './components/faculty-list/faculty-list.component';
import { DegeComponent } from './components/dege/dege.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MapComponent } from './components/map/map.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { CourselistpopupComponent } from './courselistpopup/courselistpopup.component';
import { FriendRequestListComponent } from './components/friend-request-list/friend-request-list.component';
import { SubjectPostWebSocketAPI } from './websocket/SubjectPostWebSocketAPI';
import { SubjectpostdetailsComponent } from './components/subjectpostdetails/subjectpostdetails.component';
import { CommentComponent } from './components/comment/comment.component';
import { SingleSubjectPostWebSocketAPI } from './websocket/SingleSubjectPostWebSocketAPI';
import { UserPostWebSocketAPI } from './websocket/UserPostWebSocketAPI';
import { SingleUserpostComponent } from './components/main/user/userpostdetails/single-userpost.component';
import { SingleUserPostWebSocketAPI } from './websocket/SingleUserPostWebSocketAPI';
import { CommentuserComponent } from './components/commentuser/commentuser.component';
import { CreatePostComponent } from './components/main/user/create-post/create-post.component';
import { EditprofileComponent } from './components/main/user/editprofile/editprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LoginComponent,
    ViewUserComponent,
    CourseComponent,
    SingleCourseComponent,
    DetailCourseComponent,
    UserProfileComponent,
    UserPostComponent,
    SignUpComponent,
    FriendsPopUpComponent,
    FriendsingleElementComponent,
    UniversityListComponent,
    FacultyListComponent,
    DegeComponent,
    CourseListComponent,
    MapComponent,
    SubjectDetailsComponent,
    CourselistpopupComponent,
    FriendRequestListComponent,
    SubjectpostdetailsComponent,
    CommentComponent,
    SingleUserpostComponent,
    CommentuserComponent,
    CreatePostComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    SubjectPostWebSocketAPI,
    SingleSubjectPostWebSocketAPI,
    UserPostWebSocketAPI,
    SingleUserPostWebSocketAPI

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
