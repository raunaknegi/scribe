import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm:FormGroup;
  message:string="";
  errorMessage:any;

  constructor(private fb:FormBuilder,
              private authService:AuthService) {

    this.myForm=this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      passwordConfirm:['',[Validators.required]]
    },{
      validator:this.matchPassword("password","passwordConfirm")
    })
  }

 


  ngOnInit() {
  }


  matchPassword(passwordkey:string,passwordMatch:string){
    return (group:FormGroup)=>{
      let password=group.controls[passwordkey];
      let matchPassword=group.controls[passwordMatch];
      
      if(password.value!=matchPassword.value){
        matchPassword.setErrors({
          notEqual:true
        })
      }else{
        return
      }
    }
  }

  formData(signupForm:any){
    let email:string=signupForm.value.email;
    let password:string=signupForm.value.password;
    let firstName:string=signupForm.value.firstName;
    let lastName:string=signupForm.value.lastName;
    this.message="";
    this.errorMessage=undefined;
    

    this.authService.signup(email,password,firstName,lastName).then(
      (user:any)=>{
          firebase.firestore().collection('users').doc(user.uid).set({
            firstname:signupForm.value.firstName,
            lastname:signupForm.value.lastName,
            email:signupForm.value.email,
            photoURL:user.photoURL,
            hobbies:"",
            bio:""
          }).then(()=>{
            this.message="You have been succesfully signed up. Please log in";      
          }).catch((error)=>{
            console.log(error)
          })

            
      }).catch((error)=>{
        console.log(error);
        this.errorMessage=error;
      })
  }

}
