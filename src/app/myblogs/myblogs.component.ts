import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user:any={}
  posts:any[]=[];

  constructor() {
    this.getPosts();
    this.user=firebase.auth().currentUser;
   }

  ngOnInit() {
  }

  getPosts(){
    //receives and displays all the posts.
    firebase.firestore().collection("title")
    .orderBy("createdAt","desc")
    .get().then((data)=>{
      console.log(data.docs);
      this.posts=data.docs;
    }).catch((error)=>{
      console.log(error);
    })
  }

  postCreated(){
    // refreshing all the posts.
    this.posts=[];
    this.getPosts();
  }

  onDelete(){
    this.postCreated();
  }
}
