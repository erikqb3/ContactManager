import { Component, OnInit, ViewChild } from '@angular/core';
import { Document } from '../document.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
  // @ViewChild('f') slForm: NgForm;
  // @ViewChild('name') 
  
  originalDocument: Document;
  document: Document; //editedDocument
  editMode: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    const value = form.value;
    // const newDoc = new Document()
  }

}
