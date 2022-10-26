import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Document } from "../document.model";
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent 
      .subscribe(
        (documentList: Document[]) => {
          this.documents = documentList;
        }
      )
  }
  ngOnDestroy():void {
    this.subscription.unsubscribe;
  }

}
