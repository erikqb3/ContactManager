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


  documents: Document[] = [];
  public gottenDocument: Document;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
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
}
