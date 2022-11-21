import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    const filteredContacts: Contact[] = [];
    
    contacts.forEach(contact => {
      if (contact.name.toLowerCase().includes(term.toLowerCase())){
        filteredContacts.push(contact);
      }
    });

    if (filteredContacts.length < 1) {
      return contacts;
    }

    return filteredContacts;
  }

}
