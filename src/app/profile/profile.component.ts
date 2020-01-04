import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any={};
  posts:any[]=[];

  constructor(private activatedRoute:ActivatedRoute) {
    let id=this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getProfile(id);
    this.getPosts(id);
  }

  ngOnInit() {    
  }

  getProfile(id:string){
    firebase.firestore().collection("users").doc(id).get().then((snapshot)=>{
      this.user=snapshot.data();
      this.user.id=snapshot.id;
      this.user.hobbies=this.user.hobbies.split(',');
      this.user.displayName=this.user.firstname+' '+this.user.lastname;
    }).catch((error)=>{
      console.log(error);
    })
  }

  getPosts(id:string){
    firebase.firestore().collection("title")
    .where('owner','==',id)
    .get().then((data)=>{
      this.posts=data.docs;
    })
  }

}
