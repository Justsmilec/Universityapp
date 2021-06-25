import { Faculty } from "../faculty/faculty";

export class University {
    id:string = '';
    name: string = '';
    mapURL: string = '';
    location: string = '';
    faculties: Array<Faculty> = []; 
    
}
