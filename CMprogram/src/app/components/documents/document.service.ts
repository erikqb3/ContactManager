import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from "./document.model"
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  // documentChangedEvent = new Subject<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  private maxId: number;
  private currentId: number;


  documents: Document[] = [];
  public gottenDocument: Document;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  addDocument(){}
  deleteDocument(document: Document){
    if (!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos,1);
    this.documentListChangedEvent.next(this.documents.slice());
    
  
  }
  getDocuments():Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    this.documents.forEach(singleDocument => {
      console.log(singleDocument);
      if (id == singleDocument.id){
        this.gottenDocument = singleDocument;
      }
    }
    );
    return this.gottenDocument;
  }
  getMaxId(): number {
    this.maxId = 0;

    this.documents.forEach(document => {
      this.currentId = +document.id;
      if (this.currentId > this.maxId){
        this.maxId = this.currentId;
      }
    });

    return this.maxId;
  }
  updateDocument(){}
}
