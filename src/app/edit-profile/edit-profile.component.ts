import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user:any={};
  message:string;

  constructor() { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    let userId=firebase.auth().currentUser.uid;
    console.log(userId)
    firebase.firestore().collection("users").doc(userId).get().then((snapshot)=>{
      this.user=snapshot.data();
      this.user.id=snapshot.id;
      this.user.displayName=this.user.firstname+' '+this.user.lastname;
    }).catch((error)=>{
      console.log(error);
    })
  }

  update(){
    this.message="updating profile.....";

    firebase.auth().currentUser.updateProfile({
      displayName:this.user.displayName,
      photoURL:this.user.photoURL
    }).then(()=>{
      let userId=firebase.auth().currentUser.uid;
      firebase.firestore().collection('users').doc(userId).update({
        firstname:this.user.displayName.split(' ')[0],
        lastname:this.user.displayName.split(' ')[1],
        hobbies:this.user.hobbies,
        interests:this.user.interests,
        bio:this.user.bio
      }).then(()=>{
        this.message="Profile was updated successfully";
      }).catch((error)=>{
        console.log(error);
      })
      }).catch((error)=>{
        console.log(error);
    })

  }

}
