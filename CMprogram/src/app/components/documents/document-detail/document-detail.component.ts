import { ActivatedRoute, Router, Params} from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;  
  id: string;
  nativeWindow: any;
  
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute,
              private windRefService: WindRefService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      )
      this.nativeWindow = this.windRefService.getNativeWindow();
  }
  onView(){
    if(this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  };
  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }

}
