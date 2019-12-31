import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  peoples:string[]=[];
  name:string="";
  age:number;

  getData(){
    this.peoples.push(this.name+'-'+this.age);
    console.log(this.name);
  }
}
