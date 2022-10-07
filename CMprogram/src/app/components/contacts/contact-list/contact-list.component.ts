import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>(); //Contact, int, string, number, void
  contacts: Contact[] = [
    new Contact("1","R. Kent Jackson","jacksonk@byui.edu","208-496-3771","../../assets/images/jacksonk.jpg",[]),
    new Contact("2","Rex Barzee","barzeer@byui.edu","208-496-3768","../../assets/images/barzeer.jpg",[]),
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact)
  }

}
