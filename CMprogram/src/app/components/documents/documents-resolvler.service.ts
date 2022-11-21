import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ContactService } from "../contacts/contact.service";
import { Document } from "./document.model";
import { DocumentService } from "./document.service";

@Injectable({providedIn: 'root'})
export class DocumentResolverService implements Resolve<Document[]>{
  constructor(
    private documentService: DocumentService) {
    }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
      const contacts = this.documentService.getDocuments();
      return this.documentService.fetchDocument();
    
  }
}