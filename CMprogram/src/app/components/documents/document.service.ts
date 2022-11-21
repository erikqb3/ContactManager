import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { Document } from "./document.model";
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  startedEditing = new Subject<number>();
  error=new Subject<string>();
  fireBase_link = "https://cms-project-c8a63-default-rtdb.firebaseio.com/documents.json"

  private maxDocId: number;
  private currentId: number;
  private documents: Document[] = [];


  public gottenDocument: Document;

  constructor(
    private http: HttpClient
  ) { 
    this.documents = [];
    this.maxDocId = this.getMaxId();
  }

  addDocument(newDoc: Document){
    if ((newDoc == null)||(newDoc == undefined)){
      return;
    }
    this.maxDocId++;
    newDoc.id = this.maxDocId.toString();
    this.documents.push(newDoc);
    this.storeDocument();
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
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocument();
  
  }

  fetchDocument(){
    return this.http
    .get<Document[]>(this.fireBase_link)
      .pipe(
        map(messages => {
          return messages.map(message => {
            return {
              ...message
            }
          });
        }),tap(messages => {
          this.setDocuments(messages);
        })
      )
  }

  getDocuments() {
    this.http
      .get<Document[]>(this.fireBase_link)
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocId = this.getMaxId();
          this.documents.sort((a,b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 :0)));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        // (error: any) => {
        //   console.log(error);
        // }
        )
    // return this.http.get<Document[]>(this.fireBase_link)
    //   .subscribe(
    //     ( documents: Document[] => {
    //       this.documents = documents;
    //       this.maxDocId = this.getMaxId();
    //     }, (error: any) => {
    //       console.log(error);
    //     })
    //   )
    
    // return this.http.get<Document[]>(this.fireBase_link)
    //   .subscribe(documents:Document[] => {
    //     this.documents = documents;
    //   },
    //   error => {
    //     this.error.next(error.messsage)
    //   })
    // return this.documents.slice();
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
  setDocuments(documents: Document[]){
    this.documents = documents;
    this.documentListChangedEvent.next(this.documents.slice());

  }
  storeDocument(){
    const storedDocuments = this.documents;
    this.http.put(this.fireBase_link, storedDocuments)
      .subscribe(response => {
        console.log(response);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  // setDocuments(documents: Document[]){
  //   this.documents = documents;
  //   this.documentListChangedEvent.next(this.documents.slice());
  // }

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
    this.storeDocument();
    

  }
}
