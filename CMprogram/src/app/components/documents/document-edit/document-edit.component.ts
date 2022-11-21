import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Document } from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit, OnDestroy  {
  // @ViewChild('f') slForm: NgForm;
  // @ViewChild('name') 
  
  id:number;
  originalDoc: Document;
  document: Document; //editedDocument
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: string;
  editedItem: Document;


  constructor(
      private docService: DocumentService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe(
      (params: Params) => {
        this.editedItemIndex = params['id'];
        console.log(this.editedItemIndex);
        if (this.editedItemIndex == null || this.editedItemIndex == undefined) {
          this.editMode = false;
          console.log("HELLOW")
          return;
        }
        console.log(this.editMode)
        // this.editMode = params['id'] != null;
        this.originalDoc = this.docService.getDocument(this.editedItemIndex)
        if (this.originalDoc == null || this.originalDoc == undefined){ // !originalDoc
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDoc));
      }

    )

    // this.subscription = this.docService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       console.log(index);
    //       this.editedItemIndex = index;
    //       if (index == null || index == undefined){ //!index
    //         this.editMode = false;
    //         return;
    //       }
    //       this.originalDoc = this.docService.getDocument(index.toString());

    //       if (this.originalDoc == null || this.originalDoc == undefined){ // !originalDoc
    //         return;
    //       }
    //       this.editMode = true;
    //       this.document = JSON.parse(JSON.stringify(this.originalDoc));
    //     }
    //   )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newDoc = new Document(this.docService.getMaxId().toString(), value.name, value.description, value.url,[]);
    if (this.editMode == true) {
      this.docService.updateDocument(this.originalDoc, newDoc);
    }
    else {
      this.docService.addDocument(newDoc);
    }
    this.editMode = false;
    form.reset();
    this.onCancel();
  }

}
