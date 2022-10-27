import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  public gottenContact: Contact;
  
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts():Contact[] {
    return this.contacts.slice();
   }

   getContact(id: string): Contact {
    this.contacts.forEach(singleContact => {
      console.log(singleContact);
      if (id == singleContact.id){
        this.gottenContact = singleContact;
      }
    }
    );
    return this.gottenContact;
   }
   deleteContact(contact: Contact){
    if (!contact){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }
    this.contacts.splice(pos,1);
    this.contactChangedEvent.next(this.contacts.slice());
   }
}
