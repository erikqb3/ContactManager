import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from "../document.model";
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1,"Dance 180M","Beginning Social Dance","url",[]),
    new Document(2,"WDD331R","Advanced CSS","url",[]),
    new Document(3,"COMM 315","Design for Social Media","url",[]),
    new Document(4,"CIT 365",".Net Software Development","url",[]),
    new Document(4,"WDD 430","Web Full-Stack Development","url",[]),
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
