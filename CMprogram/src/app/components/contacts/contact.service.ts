import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();

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
}
