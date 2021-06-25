import { Dege } from "../dege/dege";
import { University } from "../university/university";

export class Faculty {
    id:string = '';
    name: string = '';
    university:University = new University();
    mapURL:string = '';
    deget: Array<Dege> = [];
}
