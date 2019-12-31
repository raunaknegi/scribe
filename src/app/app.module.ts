import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCcQR0cRlkmBl-xBEVI7KwbgKEVAyd8KJ0",
  authDomain: "scribe-304e0.firebaseapp.com",
  databaseURL: "https://scribe-304e0.firebaseio.com",
  projectId: "scribe-304e0",
  storageBucket: "scribe-304e0.appspot.com",
  messagingSenderId: "906650868636",
  appId: "1:906650868636:web:f1aea44a6a7eda453dc659",
  measurementId: "G-87HM94BEWL"
};

firebase.initializeApp(firebaseConfig);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
