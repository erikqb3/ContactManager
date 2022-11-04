import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Document } from '../document.model'
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  editedItemIndex: number;
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
        this.editedItemIndex = +params['id'];
        console.log(params);
        if (params == null || params == undefined) {
          this.editMode = false;
          return;
        }
        // this.editMode = params['id'] != null;
        this.originalDoc = this.docService.getDocument(this.editedItemIndex.toString())
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
    const newDoc = new Document(this.docService.getMaxId().toString(), value.name, value.descript, value.url,[]);
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
