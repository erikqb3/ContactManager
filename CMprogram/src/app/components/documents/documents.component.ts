import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  selectedDocument: Document;
  documentSelectedElement_sub: Subscription;
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentSelectedElement_sub = this.documentService.documentSelectedEvent
    .subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }
  ngOnDestroy(): void {
    this.documentSelectedElement_sub.unsubscribe;
  }

}
