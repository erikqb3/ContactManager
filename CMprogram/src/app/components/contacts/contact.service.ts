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

  private maxContactId: number;
  private currentId: number;
  private contacts: Contact[] = [];
  public gottenContact: Contact;
  
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   addContact(newContact: Contact){
    if ((newContact == null)||(newContact == undefined)){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
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
   getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach(contact => {
      this.currentId = +contact.id;
      if (this.currentId > maxId){
        maxId = this.currentId;
      }
    });
    return maxId;
  }

   updateContact(originalContact: Contact, newContact: Contact){
    switch (originalContact || newContact){
      case null:
      case undefined:
        return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactChangedEvent.next(this.contacts.slice());
  }
   
}
