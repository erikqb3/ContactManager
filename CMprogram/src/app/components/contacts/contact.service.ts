import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  fireBase_link: string = "https://cms-project-c8a63-default-rtdb.firebaseio.com/contacts.json"

  private maxContactId: number;
  private currentId: number;
  private contacts: Contact[] = [];
  public gottenContact: Contact;
  
  constructor(
    private http: HttpClient
  ) {
    this.contacts = [];
   }

   addContact(newContact: Contact){
    if ((newContact == null)||(newContact == undefined)){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contacts.sort((a,b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0)));
    this.storeContact();
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
    this.storeContact();
   }
   getContacts(){
    this.http
      .get<Contact[]>(this.fireBase_link)
        .subscribe(
          (contacts: Contact[])=>{
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contacts.sort((a,b) => (a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0)));
            this.contactChangedEvent.next(this.contacts.slice());
          }
        )
   }
  getContact(id: string): Contact {
  this.contacts.forEach(singleContact => {
    // console.log(singleContact);
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
  storeContact(){
    const storedContacts = this.contacts;
    this.http
      .put(this.fireBase_link,storedContacts)
        .subscribe(response => {
          this.contactChangedEvent.next(this.contacts.slice());
        })
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
    this.storeContact();
  }
   
}
