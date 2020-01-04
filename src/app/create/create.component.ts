import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editorConfig:any;
  title:string;
  content:string;
  @Output ('createdPost') createdPost=new EventEmitter();
  constructor() {
    this.editorConfig={
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "minHeight": "150",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": false,
      "placeholder": "Enter text here...",
      "imageEndPoint": "",
      "toolbar": [
          ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
          ["fontName", "fontSize", "color"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
          ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
          ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
          ["link", "unlink", "image", "video"]
      ]
    }
   }

  ngOnInit() {
  }

  SubmitPost(){
    firebase.firestore().collection('title').add({
      title:this.title,
      content:this.content,
      owner:firebase.auth().currentUser.uid,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      this.createdPost.emit();
     // console.log(data);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
