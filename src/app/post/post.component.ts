import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post')post:any;
  @Output('onDeletion')onDeletion=new EventEmitter();

  userData:any={};
  user:any={};
  
  constructor() { }

  ngOnInit() {

    this.userData=this.post.data();
    this.user=firebase.auth().currentUser;
  }

  Delete(){
    firebase.firestore().collection('title').doc(this.post.id).delete().then(()=>{
      this.onDeletion.emit();
    });
  }

}
