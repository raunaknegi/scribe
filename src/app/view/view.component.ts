import { Component, OnInit,NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  post:any={};
  postId:any={}
  constructor(private activatedRoute:ActivatedRoute,
              private ngzone:NgZone) {

    this.postId=this.activatedRoute.snapshot.paramMap.get('postId');
    firebase.firestore().collection('title').doc(this.postId).get().then((snapshot)=>{

      this.ngzone.run(()=>{
        this.post=snapshot.data();
        console.log(this.post);
      });      
    });
   }

  ngOnInit() {
  }

}
