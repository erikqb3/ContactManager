import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ContactService } from "../contacts/contact.service";
import { Contact } from "./contact.model";

@Injectable({providedIn: 'root'})
export class ContactResolverService implements Resolve<Contact[]>{
  constructor(
    private contactService: ContactService) {
    }
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
      // const contacts = this.contactService.getContacts();
      // console.log(contacts);
      // if (contacts.length === 0 ){
      //   return this.contactService.fetchContacts();
      // } else {
      //   return contacts;
      // }
      return this.contactService.fetchContacts();
    
  }
}