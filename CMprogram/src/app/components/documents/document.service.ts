import { EventEmitter, Injectable } from '@angular/core';
import { Document } from "./document.model"
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();

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
}
