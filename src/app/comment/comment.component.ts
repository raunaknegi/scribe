import { Component, OnInit,Input } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  loggedIn:boolean=false;
  comment:string="";
  comments:any[]=[];
  @Input('postId')postId:string;



  constructor() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
       this.loggedIn=true
      }else{
        this.loggedIn=false
      }
    })


   }

  ngOnInit() {
    this.getComments();
  }

  postComment(){
    firebase.firestore().collection("comments").add({
      text:this.comment,
      post:this.postId,
      owner:firebase.auth().currentUser.uid,
      ownername:firebase.auth().currentUser.displayName,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      console.log(data);
      this.getComments();
    }).catch((error)=>{
      console.log(error)
    })
  }

  getComments(){
    this.comments=[];
    firebase.firestore().collection('comments')
    .where('post','==',this.postId)
    .orderBy('createdAt','desc')
    .get().then((data)=>{
      data.docs.forEach((snapshot)=>{
        this.comments.push(snapshot.data());
      })

    }).catch((error)=>{
      console.log(error);
    })
  }
}
