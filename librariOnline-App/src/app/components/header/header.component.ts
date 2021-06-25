import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification1 } from 'src/app/model/notification/notification';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() item: any;
  @Output() newItemEventi = new EventEmitter<string>();
  constructor(private zone: NgZone,private notificationService:NotificationService, private http: HttpClient, private userService: UserService, private authentocationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  user: any;
  notifications:Array<Notification1> = [];
  friendRequestNotifications: Array<any> = [];
  unreadnotifications: Array<Notification1> = [];
  displayNotification: boolean = false;
  ngOnInit(): void {    
    let username = this.authentocationService.getLoggedInUserName();
    
    if (username != null) {
      this.returnUser(username); 
    }else{
      let id = this.route.snapshot.paramMap.get('id');
      this.returnUserFromId(id);
    }

   
    

  }
  returnUser(username: any) {

    this.userService.getUsers(username).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.user = res;
        this.notifications = this.notificationService.getNotificationsofuser(this.user);  
        this.unreadnotifications = this.notifications.filter(obj => obj.status == "unread");
        

      });
    });
  }
  returnUserFromId(id: any) {

    this.user = null;
    this.userService.getUsersFromId(id).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.user = res;
        this.notifications = this.notificationService.getNotificationsofuser(this.user);
        
        this.unreadnotifications = this.notifications.filter(obj => obj.status == "unread");

        
      });
    });
  }

  userProfile() {
    this.router.navigate(['app/user/', this.user.id]);
  }
  mainmenu(){
    this.router.navigate(['app/']);

  }
  addNewItem(value: string) {
    this.newItemEventi.emit(value);
    // this.userService.save(this.user).subscribe((result) => {
    //   console.log(result);

    // });

  }

  displayUser() {
    this.router.navigate(['/app/view'])
  }

  createPost(){
    this.router.navigate(['/app/user/createpost'])

  }
  updateProfile(){
    this.router.navigate(['app/user/updateprofile'])
  }
  logOut() {
    this.authentocationService.logOut();
    this.router.navigate([''])
  }



  displayNotification_(){
    this.displayNotification = !this.displayNotification;
    console.log(this.displayNotification + " ---- ");
    this.userService.setNotificationAsreadState(this.authentocationService.getLoggedInUserName()).subscribe(res => {
      this.zone.run(() => { // <== execute the changes in this callback.
        this.notifications = this.notificationService.getNotificationsofuser(this.user);
        
        this.unreadnotifications = this.notifications.filter(obj => obj.status == "unread");
      });
    });
    
  }




  //Helper

  isEmptyObject(obj:any) {
      if(obj == null)
       return true;
      else
       return false;
  }
}
