import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgForm,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  originalContact: Contact;
  contact: Contact;
  subscript: Subscription;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  editItemIndex: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.subscript = this.route.params.subscribe((params: Params) => {
      this.editItemIndex = params['id'];
      if (this.editItemIndex == null || this.editItemIndex == undefined) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.editItemIndex);
      if (this.originalContact == null || this.originalContact == undefined) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group && this.originalContact.group.length > 0) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group)
        );
      }
    });
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.contact.group = this.groupContacts;
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      //if newContact is empty
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      //check if adding self to contacts
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      //check for repeats
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newContact = new Contact(
      this.contactService.getMaxId().toString(),
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.editMode = false;
    form.reset();
    this.onCancel();
  }
}
