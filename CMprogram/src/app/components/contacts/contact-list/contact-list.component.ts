import { Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  constactChangedEvent_sub : Subscription;
  term: string;
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.constactChangedEvent_sub = this.contactService.contactChangedEvent
      .subscribe(
        (contactArray: Contact[]) => {
          this.contacts = contactArray;
        }
      )
  }
  ngOnDestroy(): void {
    this.constactChangedEvent_sub.unsubscribe;
  }

  onContactSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.next(contact);
  }

  search(value: string){
    this.term = value;
  }

}
