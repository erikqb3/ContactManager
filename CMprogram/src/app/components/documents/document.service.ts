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
  startedEditing = new Subject<number>();

  private maxDocId: number;
  private currentId: number;
  private documents: Document[] = [];


  public gottenDocument: Document;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocId = this.getMaxId();
  }

  addDocument(newDoc: Document){
    if ((newDoc == null)||(newDoc == undefined)){
      return;
    }
    this.maxDocId++;
    newDoc.id = this.maxDocId.toString();
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice());
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
  getDocuments():Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    this.documents.forEach(singleDocument => {
      // console.log(singleDocument);
      if (id == singleDocument.id){
        this.gottenDocument = singleDocument;
      }
    }
    );
    return this.gottenDocument;
  }
  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(document => {
      this.currentId = +document.id;
      if (this.currentId > maxId){
        maxId = this.currentId;
      }
    });

    return maxId;
  }
  updateDocument(originalDoc: Document, newDoc: Document){
    switch (originalDoc || newDoc){
      case null:
      case undefined:
        return;
    }

    let pos = this.documents.indexOf(originalDoc);
    if (pos < 0) {
      return;
    }

    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
    this.documentListChangedEvent.next(this.documents.slice());
    

  }
}
