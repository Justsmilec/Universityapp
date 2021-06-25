import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { University } from 'src/app/model/university/university';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { UniversityService } from 'src/app/service/university.service';
import { FacultyService } from 'src/app/service/faculty.service';
import { Faculty } from 'src/app/model/faculty/faculty';
import { Dege } from 'src/app/model/dege/dege';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    file: any;
    addedItem: boolean | undefined;
    url: any;

    name:string = '';
    username:string ='';
    email:string = '';
    age:number = 0;
    password:string = '';
    universityName:string = '';
    facultyName:string = '';
    actualSemester:number = 0;
    actualClass:string = '';
  
    public user: User;
    ImageModel:any={
      url: "",
      name:""
    }


    universityDTO:any = [];
    facultyDTO:any = [];
    facultyObj:Faculty = new Faculty();
    courses:Array<Dege> = [];
  constructor(private zone: NgZone, private httpClient: HttpClient,private facultyService:FacultyService,private universityService: UniversityService , userService: UserService, private router: Router) {
    this.user = new User();
   }
  ngOnInit(): void {

   this.returnUniversityDTO();
  }

  /*
  ****************
  */
  returnUniversityDTO() {

    this.universityService.getUniversityDTO().subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.universityDTO = res;
      });
    });
  }

  returnFacultyDTOFromUnivID(id:any) {

    this.universityService.getFacultiesDTOFromUniveId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.facultyDTO = res;
      });
    });
  }

  returnFacultyFromID(id:any) {

    this.facultyService.getFacultyFromId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.facultyObj = res;
      });
    });
  }

  returnDegetFromFaculty(id:any) {

    this.facultyService.getCoursesFromFaculty(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.courses = res;
      });
    });
  }

  selectOption($id: any) {
    console.log("--: " , $id.target.value);
    console.log(this.universityName)

    this.returnFacultyDTOFromUnivID(this.universityName);
  }

  selectFacultyOption($id:any){
    console.log("---:: " ,$id.target.value);
    this.returnFacultyFromID($id.target.value);
    this.returnDegetFromFaculty($id.target.value);
    

  }
  updateFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        this.user.profilePic = this.url;
        
      }
  
      reader.readAsDataURL(event.target.files[0]);
      console.log("----: ",event.target.files[0]);

    }  
  }

  
    onUpload() {
  
      this.user.profilePic = this.url;
      this.ImageModel.name = "Adem";
      console.log("*** " , this.url);
  
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.  
      this.httpClient.post('http://localhost:8081/api/v1/save', this.user, {observe: 'response' })
  
        .subscribe((response) => {
  
          // if (response.status === 200) {
  
          //   this.message = 'Image uploaded successfully';
  
          // } else {
  
          //   this.message = 'Image not uploaded successfully';
  
          // }

        }

        );

    }

    onSubmit(){

      var univ = new University();
      univ.name  = this.universityName;
      univ.mapURL = "map";
      this.user.name = this.name;
      this.user.username = this.username;
      this.user.email = this.email;
      this.user.age = this.age;
      this.user.password = this.password;
      this.user.university = univ;
      this.user.actualSemester = this.actualSemester;
      this.user.actualClass = this.actualClass;
      this.user.faculty = this.facultyObj;
      this.user.profilePic = this.url;
      this.user.minorSubjects = [];
    
     this.httpClient.post('http://localhost:8081/api/v1/save', this.user, {observe: 'response' })
  
        .subscribe((response) => {


  
          // if (response.status === 200) {
  
          //   this.message = 'Image uploaded successfully';
  
          // } else {
  
          //   this.message = 'Image not uploaded successfully';
  
          // }

          sessionStorage.setItem("authenticateUser",this.user.username);


          this.router.navigate(['/app'])

        }

        );


    }

}
