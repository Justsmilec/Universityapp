import { Faculty } from "./faculty/faculty";
import { Subject } from "./subject/subject";
import { Notification1 } from "./notification/notification";

import { University } from "./university/university";
import { Notification, Observable } from "rxjs";

export class User {
    name: string = '';
    username: string = '';
    password: string = '';
    email:string = '';
    age:number = 0;
    university: University = new University();
    faculty:Faculty = new Faculty();
    actualClass: string = '';
    actualSemester:number = 0;
    profilePic:string = '';
    friends: Array<User> = [];
    pendingFriends: Array<String> = [];
    minorSubjects: Array<Subject> = [];
    notifications: Array<Notification1> = [];
}
