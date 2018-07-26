import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
  // using keyup and blur together with (click) causes function to be called twice on click
  //  template: ` <input #entry (keyup.enter)="myClick(entry.value)" (blur)="myClick(entry.value); entry.value='' ">  
  template: `
  <p>https://www.youtube.com/watch?v=1_m8goa6PV8</p>
  <p>https://www.youtube.com/watch?v=0_C2HJvtRDY</p>
  <input #entry (keyup.enter)="myClick(entry.value)">  
  <button (click)="myClick(entry.value)">ClickMe</button>  
  <img [src]="dImg"> 
  `
})

export class MyFormComponent implements OnInit {  
  //dImg = this.getSanitizeUrl("../../assets/koala.jpg");
  dImg = this.getSanitizeUrl("https://picsum.photos/300/300");
  constructor(private myService: MyServiceService, private sanitizer: DomSanitizer) { }
  ngOnInit() {
  }
  getSanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  myClick(entry: string) {
    //do link validation here
    this.myService.hitNodeAPI(entry).subscribe(event => {      
      console.log(event);      
      this.dImg = this.getSanitizeUrl('http://localhost:4000/static/Final_Balanced.jpg');
    });
  }
}