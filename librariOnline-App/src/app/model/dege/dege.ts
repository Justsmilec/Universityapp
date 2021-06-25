import { Faculty } from "../faculty/faculty";
import { User } from "../user";
import { Subject } from "../subject/subject";


export class Dege {

    id:string = '';
    name:string  = '';
    subjects: Array<Subject> = [];
    students: Array<User> = [];
    faculty: Faculty = new Faculty();
}
