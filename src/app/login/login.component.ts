import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:FormGroup;
  message:string="";
  errorMessage:any;


  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router) {
    this.myForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  ngOnInit() {
  }

  formData(signupForm:any){
    this.message="";
    this.errorMessage=undefined;

    this.authService.login(signupForm.value.email,signupForm.value.password).then(
      (response)=>{
        console.log(response);
        this.message="You have been succesfully logged in";

        this.router.navigate(['/myblogs']);
        
      }).catch((error)=>{
        console.log(error);
        this.errorMessage=error;
      })
  }

}
