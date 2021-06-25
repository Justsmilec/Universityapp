import { Time } from "@angular/common";
import { Dege } from "../dege/dege";
import { User } from "../user";

export class Subject {
    id:string = '';
    name: string = '';
    professor: string = '';
    credits:string = '';
    classRoomNumber: number = 0;
    semester: number = 0;
    students: Array<User> = [];
    dega: Dege = new Dege();
    date: DateModel = new DateModel();
}

class DateModel {
    dayOfWeek:number = -1;
    time: string = '';
}
