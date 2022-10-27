import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  selectedContact : Contact;
  contactSelectedEvent_sub : Subscription;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactSelectedEvent_sub = this.contactService.contactSelectedEvent
    .subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    )
  }
  ngOnDestroy(): void {
    this.contactSelectedEvent_sub.unsubscribe;
  }

}
