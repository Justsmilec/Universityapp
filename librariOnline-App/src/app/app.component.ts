import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'librariOnline-App';
  dataFromChild = 'Not changed';
  dataArray: string[] = [];
  currentItem = "This is a header";
  writeToMainChildComponent = "This is main part: "+this.dataFromChild+ " -- Length: "+ this.dataArray.length;

  addItem(newItem: string)
  {
    this.dataFromChild = newItem;
    console.log(newItem);
    this.dataArray.push(newItem);
    this.writeToMainChildComponent = "This is main part: "+this.dataFromChild+ " -- Length: "+ this.dataArray.length;


    
  }
}
